<script setup lang="ts">
import { ref, watch, computed } from "vue";

type Props = {
  order?: "horizontal" | "vertical";
  width: number;
};
const props = withDefaults(defineProps<Props>(), { order: "horizontal" });

const buffer = ref<HTMLElement>();
const content = ref<HTMLElement>();

const wall = ref<HTMLElement>();
const list = computed(() => Array.from(buffer.value?.children ?? []));

function reload() {
  console.log("Hello ping pong");
}

watch(
  () => buffer.value?.childElementCount ?? 0,
  (value: number) => {
    console.log(value);
  }
);

// const checker = setInterval(() => {
//   console.log("children", wall.value?.children.length ?? 0);
//   list.value = Array.from(wall.value?.children ?? []);
// }, 100);
// onBeforeUnmount(() => clearInterval(checker));

watch(() => list.value.length, createWall);
window.addEventListener("resize", createWall);

function createWall() {
  if (!content.value || list.value.length == 0) return;
  const numCols = Math.ceil((content.value?.clientWidth ?? 0) / props.width);

  content.value.innerHTML = "";
  content.value.style?.setProperty(
    "grid-template-columns",
    `repeat(${numCols}, minmax(0, 1fr))`
  );

  for (let i = 0; i < numCols; i++) {
    const items =
      list.value?.filter((x) => (list.value?.indexOf(x) ?? 0) % numCols == i) ??
      [];

    const col = document.createElement("div");
    col.classList.add("col");
    for (const item of items) col.appendChild(item.cloneNode(true));

    content.value.appendChild(col);
  }
}
</script>
