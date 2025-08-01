import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  articleId: string;
  quantity: number;
  price: number;
  classId?: string[];
  gift?: boolean;
  useNow?: boolean;
  otherId?: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items:
    typeof window !== "undefined" && localStorage.getItem("articles")
      ? JSON.parse(localStorage.getItem("articles")!)
      : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const { articleId, gift, otherId, quantity } = action.payload;

      const existingUsed = state.items.find(
        (item) =>
          item.articleId === articleId &&
          item.gift === gift &&
          item.otherId === otherId &&
          item.useNow,
      );

      const existing = state.items.find(
        (item) =>
          item.articleId === articleId &&
          item.gift === gift &&
          item.otherId === otherId &&
          !item.useNow,
      );

      if (!existingUsed && !existing && quantity === 1) {
        state.items.push({ ...action.payload, useNow: true });
      }
      if (!existingUsed && !existing && quantity > 1) {
        state.items.push(
          { ...action.payload, useNow: true, quantity: 1 },
          { ...action.payload, quantity: quantity - 1 },
        );
      }
      if (existing && existingUsed) {
        existing.quantity = action.payload.quantity;
      }

      // else {
      //   state.items.push({ ...action.payload, useNow: true });
      // }

      localStorage.setItem("articles", JSON.stringify(state.items));
    },
    removeItem(
      state,
      action: PayloadAction<{
        articleId: string;
        gift?: boolean;
        useNow?: boolean;
      }>,
    ) {
      const { articleId, gift } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(
            item.articleId === articleId &&
            item.gift === gift &&
            (item.useNow ?? false) === (action.payload.useNow ?? false)
          ),
      );

      localStorage.setItem("articles", JSON.stringify(state.items));
    },
    addUseNow(
      state,
      action: PayloadAction<{ articleId: string; otherId?: string }>,
    ) {
      const { articleId, otherId } = action.payload;

      const target = state.items.find(
        (item) =>
          item.articleId === articleId &&
          !item.gift &&
          !item.useNow &&
          (otherId ? item.otherId === otherId : !item.otherId),
      );

      const alreadyUsed = state.items.find(
        (item) =>
          item.useNow && (otherId ? item.otherId === otherId : !item.otherId),
      );

      if (target && target.quantity === 1 && !alreadyUsed) {
        target.useNow = true;
      }

      if (target && target.quantity > 1 && !alreadyUsed) {
        target.quantity -= 1;

        state.items.push({
          articleId,
          quantity: 1,
          price: target.price,
          otherId,
          useNow: true,
        });
      }

      localStorage.setItem("articles", JSON.stringify(state.items));
    },
    removeUseNow(
      state,
      action: PayloadAction<{
        articleId: string;
        price: number;
        otherId?: string;
      }>,
    ) {
      const { articleId, price, otherId } = action.payload;

      // Poiščemo ciljnega elementa, ki ni useNow in ima ustrezne lastnosti
      const target = state.items.find(
        (item) =>
          item.articleId === articleId &&
          !item.gift &&
          !item.useNow &&
          (otherId ? item.otherId === otherId : !item.otherId),
      );

      if (target) {
        target.quantity += 1;
      } else {
        state.items.push({
          articleId,
          price,
          otherId,
          quantity: 1,
        });
      }

      // Odstranimo samo elemente z useNow: true in ustreznim otherId
      state.items = state.items.filter(
        (item) =>
          !(
            item.useNow && (otherId ? item.otherId === otherId : !item.otherId)
          ),
      );

      localStorage.setItem("articles", JSON.stringify(state.items));
    },
    assignOtherId(
      state,
      action: PayloadAction<{
        articleId: string;
        otherId: string;
      }>,
    ) {
      const { articleId, otherId } = action.payload;

      const target = state.items.find(
        (item) =>
          item.articleId === articleId &&
          !item.useNow &&
          !item.gift &&
          !item.otherId,
      );

      console.log(target?.quantity);

      if (target) {
        if (target.quantity > 1) {
          target.quantity -= 1;

          state.items.push({
            articleId,
            quantity: 1,
            price: target.price,
            otherId,
          });
        } else {
          target.otherId = otherId;
          target.useNow = true;
        }

        localStorage.setItem("articles", JSON.stringify(state.items));
      }
    },
    removeOtherId(
      state,
      action: PayloadAction<{
        articleId: string;
        otherId: string;
        price: number;
      }>,
    ) {
      const { articleId, otherId, price } = action.payload;
      const target = state.items.find(
        (item) =>
          item.articleId === articleId &&
          !item.gift &&
          !item.useNow &&
          !item.otherId,
      );

      if (target) {
        target.quantity += 1;
      } else {
        state.items.push({
          articleId,
          quantity: 1,
          price,
        });
      }

      state.items = state.items.filter((item) => item.otherId !== otherId);
      localStorage.setItem("articles", JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("articles");
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  addUseNow,
  removeUseNow,
  assignOtherId,
  removeOtherId,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getCart = (state: { cart: CartState }) => state.cart;
