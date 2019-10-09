<template>
  <div>
    <scroll @loadCallback="loadCallback" :isend="isend" :readyToLoad="readyToLoad" @scroll="scroll">
      <template v-for="item in list">
        <item :data="item" :key="item.id"></item>
      </template>
    </scroll>
  </div>
</template>

<script>
import item from "./item";
import scroll from "./scroll";

export default {
  components: {
    item,
    scroll
  },
  data() {
    return {
      isend: false,
      readyToLoad: false,
      page: 1,
      pageSize: 10,
      list: [
        {
          id: "1",
          name: "a",
          content: "ceshi",
          pho: []
        },
        {
          id: "2",
          name: "b",
          content: "ceshi",
          pho: []
        },
        {
          id: "3",
          name: "c",
          content: "ceshi",
          pho: []
        },
        {
          id: "4",
          name: "e",
          content: "ceshi",
          pho: []
        },
        {
          id: "5",
          name: "f",
          content: "ceshi",
          pho: []
        },
        {
          id: "6",
          name: "g",
          content: "ceshi",
          pho: []
        },
        {
          id: "7",
          name: "h",
          content: "ceshi",
          pho: []
        },
        {
          id: "8",
          name: "i",
          content: "ceshi",
          pho: []
        },
        {
          id: "9",
          name: "j",
          content: "ceshi",
          pho: []
        },
        {
          id: "10",
          name: "k",
          content: "ceshi",
          pho: []
        }
      ]
    };
  },
  methods: {
    loadCallback() {
      this.axios
        .get("/postsend/getList", {
          page: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
            this.list.push(...res.data)
        });
    },
    scroll() {}
  }
};
</script>

<style lang="scss" scoped>
</style>