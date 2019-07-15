<template>
  <div class="article-container">
    <!-- 筛选容器 -->
    <el-card>
      <div slot="header">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>-->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 筛选容器内容 -->
      <el-form :model="reqParams" size="small" label-width="80px">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="reqParams.channel_id">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changeDate"
            v-model="dateValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果容器 -->
    <el-card>
      <div slot="header">
        根据筛选条件共查询到
        <b>{{total}}</b> 条结果：
      </div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image lazy :src='scope.row.cover.images[0]' style="width:100px;height:75px">
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" width="100" height="75" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" plain circle type="primary"></el-button>
            <el-button icon="el-icon-delete" plain circle type="danger"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="box">
        <el-pagination background layout="prev, pager, next" :total="total">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import MyBread from '../../components/my-bread'
export default {
  components: { MyBread },
  data () {
    return {
      // 提交给后台的筛选条件
      // 数据默认null和'' 的区别 空字符会发生给后台 ，null不会发生字段到后台
      reqParams: {
        page: 1,
        per_page: 10,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 默认数据
      channelOptions: [],
      //   日期控件数据
      dateValues: [],
      articles: [],
      total: 100
    }
  },
  created () {
    this.getChannelOptions()
    this.getArticles()
  },
  methods: {
    search () {
      this.getArticles()
    },
    changeDate (values) {
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },
    async getChannelOptions () {
      const { data: { data } } = await
      this.$ajax.get('channels')
      this.channelOptions = data.channels
    },
    async getArticles () {
      const { data: { data } } = await
      this.$ajax.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
// 注意：el-card 是组件，解析后标签的名字不是 el-card ，标签上类名和自定义标签名字一致
.el-card {
  margin-bottom: 20px;
}
.box {
  margin-top: 20px;
  text-align: center;
}
</style>
