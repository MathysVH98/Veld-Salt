"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  PRODUCTS,
  quantityOptions,
  formatZAR,
  type Product,
  type QtyOption,
} from "@/lib/products";

export type CartItem = {
  productId: string;
  option: string; // quantity option label, e.g. "500g"
  count: number;
};

export const FREE_SHIPPING_THRESHOLD = 1000;
export const SHIPPING_FEE = 150;

/** Flat-rate shipping, free once the subtotal reaches the threshold. */
export function shippingFor(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}

type Toast = { id: number; msg: string };

type CartContextValue = {
  items: CartItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (productId: string, option: string, count?: number) => void;
  remove: (productId: string, option: string) => void;
  setCount: (productId: string, option: string, count: number) => void;
  changeOption: (productId: string, from: string, to: string) => void;
  clear: () => void;
  totalCount: number;
  subtotal: number;
  shipping: number;
  grandTotal: number;
  toast: Toast | null;
};

const Ctx = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "plaas-gedrag-cart";

export type CartLine = {
  product: Product;
  option: QtyOption;
  unit: number;
  total: number;
  count: number;
};

/** Resolve a cart item to its product, chosen option and prices. */
export function resolveLine(item: CartItem): CartLine | null {
  const product = PRODUCTS.find((p) => p.id === item.productId);
  if (!product) return null;
  const opts = quantityOptions(product);
  const option = opts.find((o) => o.label === item.option) ?? opts[0];
  const unit = product.price * option.mult;
  return { product, option, unit, total: unit * item.count, count: item.count };
}

function subtotalOf(items: CartItem[]): number {
  return items.reduce((s, it) => s + (resolveLine(it)?.total ?? 0), 0);
}

export type OrderDetails = {
  name?: string;
  phone?: string;
  address?: string;
  note?: string;
};

/** Compose the WhatsApp order message from the cart. */
export function buildOrderMessage(
  items: CartItem[],
  details: OrderDetails = {}
): string {
  const lines = items
    .map((it, i) => {
      const l = resolveLine(it);
      if (!l) return "";
      return `${i + 1}. ${l.product.name} - ${l.option.label} x${it.count} = ${formatZAR(
        l.total
      )}`;
    })
    .filter(Boolean);

  const subtotal = subtotalOf(items);
  const shipping = shippingFor(subtotal);

  let msg = `Hi Plaas Gedrag!\n\nMy order:\n${lines.join("\n")}`;
  msg += `\n\nSubtotal: ${formatZAR(subtotal)}`;
  msg += `\nShipping: ${shipping === 0 ? "Free" : formatZAR(shipping)}`;
  msg += `\nOrder total: ${formatZAR(subtotal + shipping)}`;

  const detailLines = [
    details.name?.trim() && `Name: ${details.name.trim()}`,
    details.phone?.trim() && `Phone: ${details.phone.trim()}`,
    details.address?.trim() && `Delivery address: ${details.address.trim()}`,
    details.note?.trim() && `Note: ${details.note.trim()}`,
  ].filter(Boolean);
  if (detailLines.length) msg += `\n\n${detailLines.join("\n")}`;

  return msg;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const add = useCallback(
    (productId: string, option: string, count = 1) => {
      setItems((prev) => {
        const idx = prev.findIndex(
          (x) => x.productId === productId && x.option === option
        );
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], count: next[idx].count + count };
          return next;
        }
        return [...prev, { productId, option, count }];
      });
      // Show a lightweight confirmation instead of forcing the drawer open,
      // so the customer can keep browsing and adding products.
      const p = PRODUCTS.find((x) => x.id === productId);
      setToast({
        id: (toastId.current += 1),
        msg: p ? `${p.name} added to your order` : "Added to your order",
      });
    },
    []
  );

  const remove = useCallback((productId: string, option: string) => {
    setItems((prev) =>
      prev.filter((x) => !(x.productId === productId && x.option === option))
    );
  }, []);

  const setCount = useCallback(
    (productId: string, option: string, count: number) => {
      setItems((prev) =>
        count <= 0
          ? prev.filter(
              (x) => !(x.productId === productId && x.option === option)
            )
          : prev.map((x) =>
              x.productId === productId && x.option === option
                ? { ...x, count }
                : x
            )
      );
    },
    []
  );

  const changeOption = useCallback(
    (productId: string, from: string, to: string) => {
      if (from === to) return;
      setItems((prev) => {
        const curIdx = prev.findIndex(
          (x) => x.productId === productId && x.option === from
        );
        if (curIdx < 0) return prev;
        const existIdx = prev.findIndex(
          (x) => x.productId === productId && x.option === to
        );
        const next = [...prev];
        if (existIdx >= 0) {
          next[existIdx] = {
            ...next[existIdx],
            count: next[existIdx].count + next[curIdx].count,
          };
          next.splice(curIdx, 1);
        } else {
          next[curIdx] = { ...next[curIdx], option: to };
        }
        return next;
      });
    },
    []
  );

  const clear = useCallback(() => setItems([]), []);

  const totalCount = useMemo(
    () => items.reduce((s, x) => s + x.count, 0),
    [items]
  );
  const subtotal = useMemo(() => subtotalOf(items), [items]);
  const shipping = useMemo(() => shippingFor(subtotal), [subtotal]);
  const grandTotal = subtotal + shipping;

  const value: CartContextValue = {
    items,
    open,
    setOpen,
    add,
    remove,
    setCount,
    changeOption,
    clear,
    totalCount,
    subtotal,
    shipping,
    grandTotal,
    toast,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
