<!--
 * @Description: 富文本
 * @Date: 2021-08-24 10:41:41
 * @LastEditTime: 2022-06-15 09:13:32
-->
<template>
  <div class="container">
    <div id="editor" />
  </div>
</template>
<script>
// import { uploadFile } from "@/api/modules/common";
import { getFileFormart } from "@/utils";
import E from "wangeditor";
export default {
  props: {
    content: {
      type: String,
      default: ""
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editor: null,

      // 内容
      info: null,
      upLoading: false
    };
  },
  watch: {
    // 监听传入内容进行赋值
    content: {
      handler() {
        // this.editor.create();
        setTimeout(() => {
          //判断父组件传递过来的值跟当前编辑器内容是否一样
          if (this.editor && this.content !== this.editor.txt.html()) {
            this.editor.txt.html(this.content);
          }
        }, 10);
      },
      immediate: true
    }
  },
  mounted() {
    this.initE();
  },

  methods: {

    /**
     * @description: 初始化插件
     * @param {*}
     */
    initE() {
      this.editor = new E("#editor");
      this.editor.config.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        // "link", // 插入链接
        "justify", // 对齐方式
        "image", // 插入图片
        "undo", // 撤销
        "redo" // 重复
        // 'table',//表格
      ];
      this.editor.config.showFullScreen = false;
      this.editor.config.onchange = (html) => {
        this.info = html;
        this.$emit("update:content", this.info);
        this.$emit("change", this.info);
      };

      // 配置图片上传
      this.editor.config.uploadImgMaxLength = 5; // 一次最多上传 5 个图片
      this.editor.config.showLinkImg = false;
      this.editor.config.customUploadImg = (resultFiles, insertImgFn) => {
        // eslint-disable-next-line no-unused-vars
        // for (let v of resultFiles) {
        //   (async () => {
        //     let formData = new FormData();
        //     formData.append("file", v);
        //     let { data } = await uploadFile(formData);
        //     if (data.code === undefined) {
        //       // 上传图片，返回结果，将图片插入到编辑器中
        //       insertImgFn(`${process.env.VUE_APP_BASE_OSS}${data}`);
        //     }
        //   })();
        // }
      };
      this.editor.create();
      // 取消默认聚焦
      this.editor.disable();
      setTimeout(() => {
        if (this.disable) {
          return;
        }
        this.editor.enable();
      }, 100);
    },

    /**
     * @description: 追加内容
     * @param {*}
     */
    append(val) {
      this.editor.txt.append(val);
    },

    /**
     * @description: 校验文件格式
     * @param {*}
     */
    handleCheckFile(file) {
      const { name } = { ...file };
      const fileFormart = getFileFormart(name);
      if (this.acceptFile.includes(fileFormart)) {
        return true;
      }
      return false;
    },

    /**
     * @description: 文件选择触发
     * @param {*} file
     */
    async handleFileChange(file) {
      if (!this.handleCheckFile(file)) {
        this.$message.warning("格式不支持");
        return;
      }
      try {
        this.upLoading = true;
        let formData = new FormData();
        formData.append("file", file.raw);
        const { data } = await wordToHtml(formData);
        if (data.code === undefined) {
          this.append(data);
        }
        this.upLoading = false;
      } catch (error) {
        this.upLoading = false;
        console.log(error);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
// /deep/.w-e-toolbar,
// /deep/.w-e-text-container {
//   z-index: inherit !important;
// }
.btn-box {
  margin-bottom: 10px;
}
</style>
