import { defineStore } from "pinia";
import { Report } from "@/api";

type State = "FORM" | "LOADING" | "REPORT";

export const useStore = defineStore("app-store", {
  state: () => ({
    state: "FORM" as State,

    form: {
      id: "",
      year: "",
      semester: "",
    },

    report: null as Report | null,
  }),
});
