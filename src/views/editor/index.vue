<!--
 * @Description:
 * @Date: 2021-08-20 10:56:15
 * @LastEditTime: 2022-06-15 09:16:12
-->
<template>
  <div class="app-container">
    <div style="height:20px;"></div>
    <wang-editor
      ref="editor"
      show-word-limit
      :maxlength="100"
    />
  </div>
</template>

<script>
import WangEditor from "@/components/WangEditor";
export default {
  components: {
    WangEditor,
  },
  data() {
    return{}
  }
};
</script>

