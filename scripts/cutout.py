"""Remove the white studio background from the floating biltong photo, keeping
a soft feathered edge and full resolution for the hero. Border-connected flood
fill so the interior tan fat stays fully opaque."""
import sys
from collections import deque
import numpy as np
from PIL import Image, ImageFilter


def cutout(src, dst, d_max=80, feather=1.6, preview=None):
    im = Image.open(src).convert("RGB")
    rgb = np.asarray(im).astype(np.int16)
    H, W, _ = rgb.shape

    d = 255 - rgb.min(axis=2)  # 0 = pure white, larger = darker/more colour
    candidate = d <= d_max

    visited = np.zeros((H, W), dtype=bool)
    stack = deque()
    for x in range(W):
        for y in (0, H - 1):
            if candidate[y, x] and not visited[y, x]:
                visited[y, x] = True
                stack.append((y, x))
    for y in range(H):
        for x in (0, W - 1):
            if candidate[y, x] and not visited[y, x]:
                visited[y, x] = True
                stack.append((y, x))

    cand, vis = candidate, visited
    while stack:
        y, x = stack.pop()
        for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
            if 0 <= ny < H and 0 <= nx < W and cand[ny, nx] and not vis[ny, nx]:
                vis[ny, nx] = True
                stack.append((ny, nx))

    alpha = np.where(visited, 0, 255).astype(np.uint8)
    alpha_img = Image.fromarray(alpha, "L")
    if feather > 0:
        alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(feather))

    out = im.convert("RGBA")
    out.putalpha(alpha_img)
    out.save(dst)
    removed = int(visited.sum())
    print(f"{dst}: {W}x{H}, removed {removed * 100 // (H * W)}%")

    if preview:
        bg = Image.new("RGBA", (W, H), (21, 17, 14, 255))
        bg.alpha_composite(out)
        bg.convert("RGB").save(preview)


if __name__ == "__main__":
    a = sys.argv[1:]
    cutout(a[0], a[1], preview=a[2] if len(a) > 2 else None)
