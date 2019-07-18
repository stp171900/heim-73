<template>
  <div class="image-container" v-loading="loading">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div style="margin-bottom:20px">
        <!-- 按钮式单选框 -->
        <el-radio-group size="small" v-model="reqParams.collect" @change="search()">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
         <!-- 添加素材 -->
        <el-button size="small" @click="dialogVisible=true" style="float:right" type="success">添加素材</el-button>
      </div>
      <div>
        <ul class="img-list">
          <li v-for='item in images' :key="item.id">
            <img :src="item.url">
            <div class="fot" v-if="!reqParams.collect">
            <span
            @click="toggleFav(item)"
            class="el-icon-star-off"
            :class="{red:item.is_collected}"
            ></span>
            <span
            @click="delImage(item.id)"
            class="el-icon-delete"
            ></span>
          </div>
          </li>
        </ul>
         <el-pagination
          v-if="total>reqParams.per_page"
          background
          layout="prev, pager, next"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="pager"
          :total="total"
          ></el-pagination>
      </div>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :headers="headers"
        name="image"
        :on-success="handleSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        pager: 1,
        per_page: 12
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('heim-73')).token
      },
      loading: false
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    delImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$ajax.delete('user/images/' + id)
        this.$message.success('删除成功')
        this.getImages()
      })
    },
    async toggleFav (item) {
      const { data: { data } } = await
      this.$ajax.put('user/images/' + item.id, { collect: !item.is_collected })
      this.$message.success('收藏成功')
      item.is_collected = data.collect
    },
    handleSuccess (res) {
      // 预览 需要地址
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      // 关闭对话框  更新列表
      window.setTimeout(() => {
        this.dialogVisible = false
        this.getImages()
        this.imageUrl = null
      }, 1500)
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      this.loading = true
      const { data: { data } } = await
      this.$ajax.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
      this.loading = false
    }
  }
}
</script>

<style scoped lang='less'>
.img-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  li {
    width: 180px;
    height: 180px;
    float: left;
    border: 1px dashed #eee;
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .fot {
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
