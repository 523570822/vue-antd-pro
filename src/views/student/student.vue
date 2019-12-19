<template>
  <div>
    <a-card title="学员管理" :bordered="false">
      <div class="table-search-wrapper">
        <a-form  >
          <a-row :gutter="48">

            <a-col :md="8" :sm="24">
              <a-form-item label="联系人" v-bind="formItemLayout">
                <a-input v-model="form.contacts" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="状态" v-bind="formItemLayout">
                <a-select
                  v-model="form.declareStatus"
                  allowClear

                  placeholder="请选择"
                >
                  <a-select-option :value="0">没有通过</a-select-option>
                  <a-select-option :value="1">科目一</a-select-option>
                  <a-select-option :value="2">科目二</a-select-option>
                  <a-select-option :value="3">科目三</a-select-option>
                  <a-select-option :value="4">科目四</a-select-option>
                  <a-select-option :value="5">通过考试</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="!formFold">
            <!--  <a-col :md="8" :sm="24">
                <a-form-item label="角色" v-bind="formItemLayout">
                  <a-select v-model="form.customsId" :options="roleOptions" allowClear placeholder="请选择"></a-select>
                </a-form-item>
              </a-col>-->
             <!-- <a-col :md="8" :sm="24">
                <a-form-item label="状态" v-bind="formItemLayout">
                  <a-select
                    v-model="form.declareStatus"
                    allowClear
                    placeholder="请选择"
                  >
                    <a-select-option :value="0">没有通过</a-select-option>
                    <a-select-option :value="1">科目一</a-select-option>
                    <a-select-option :value="2">科目二</a-select-option>
                    <a-select-option :value="3">科目三</a-select-option>
                    <a-select-option :value="4">科目四</a-select-option>
                    <a-select-option :value="5">通过考试</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>-->
            <!--  <a-col :md="8" :sm="24">
                <a-form-item label="更新时间" v-bind="formItemLayout">
                  <a-range-picker
                    v-model="rangeDate"
                    :ranges="{ '今天': [moment(), moment()] }"
                    :disabledDate="currentDate => currentDate > moment()"
                    :allowClear="false"
                    style="width: 100%;"
                  ></a-range-picker>
                </a-form-item>
              </a-col>-->
            </template>
            <a-col :md="formFold && 8 || 24" :sm="24">
              <span
                class="search-buttons"
                :style="!formFold && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button type="primary" icon="search" @click="handleSearch">查询</a-button>
                <a-button icon="sync" @click="handleResetForm" style="margin-left: 8px">重置</a-button>
             <!--   <a @click="toggleFold" style="margin-left: 8px">
                  {{ formFold ? '展开' : '收起' }}
                  <a-icon :type="formFold ? 'down' : 'up'" />
                </a>-->
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="operate-wrapper">
        <a-button @click="onCreate" class="btn-item" type="primary">新增</a-button>
        <a-button @click="exportExcel" class="btn-item" type="primary">导出</a-button>
      <div  :style="{ float: 'right', overflow: 'hidden' }"> 总金额：{{total}}元 &nbsp;&nbsp;   总支付金额:{{payment}}元&nbsp;&nbsp;       未支付总额{{total-payment}}元 </div>
      </div>

      <a-table
        :columns="columns"
        :dataSource="rows"
        rowKey="id"
        :pagination="pagination"
        :loading="tableLoading"
        @change="handleTableChange"
        :rowSelection="rowSelection"
        :scroll="{ x: 500 }"
      >
        <span slot="serial" slot-scope="text, record, index">{{ serial + index + 1 }}</span>

      <!--  <span slot="role" slot-scope="roleId">{{ roleId | roleFilter(roleOptions) }}</span>-->

        <span slot="status" slot-scope="status">
          <span v-if="status==0"> 未通过考试</span>
          <span v-if="status==1">科目一</span>
           <span v-if="status==2">科目二</span>
           <span v-if="status==3">科目三</span>
           <span v-if="status==4">科目四</span>
            <span v-if="status==5">通过所有考试</span>
        </span>
        <span slot="sexT" slot-scope="sex">
             <span v-if="sex==0"> 女</span>
          <span v-if="sex==1">男</span>
        </span>
        <span slot="nextTime" slot-scope="nextTime">
          {{ new Date(nextTime) | formatDate('yyyy-MM-dd ') }}
        </span>
        <span slot="updateTime" slot-scope="updateTime">
          {{ new Date(updateTime) | formatDate('yyyy-MM-dd hh:mm') }}
        </span>
       <span slot="daiHuanKuan" slot-scope="record">
          {{record.totalAmount-record.payment>0?record.totalAmount-record.payment:0}}
        </span>
        <div slot="actions" slot-scope="record">
          <span v-if="record.status < 5">
          <a @click="showConfirm(record)" href="javascript:0;">通过</a>
            <a-divider type="vertical" />
             <a @click="showNoConfirm(record)" href="javascript:0;">不通过</a>
            <a-divider type="vertical" />
          </span>

          <span v-if="record.payment < record.totalAmount">
          <a @click="showPayment(record)" href="javascript:0;">还款</a>
            <a-divider type="vertical" />
          </span>
          <a @click="onEdit(record)" href="javascript:0;">编辑</a>
          <a-divider type="vertical" />
          <a @click="onDelete(record.id)" href="javascript:0;">删除</a>
        </div>

      </a-table>
    </a-card>

    <!--新增/修改用户-->
    <account-modal      :visible="visible"            :account="currentAccount" @close="onModalClose" />
    <add-payment-modal :visible="visibleAccount" :account="currentAccount" @close="onModalAccountClose" />
  </div>
</template>

<script>
import { queryFormMixin, tableMixin, rangePickerMixin } from '@/mixins'
import AccountModal from './components/AccountModal'
import AddPaymentModal from './components/AddPaymentModal'
import { deleteAccount, getRoles, getStudent, passExam, nopassExam, getExcle, bland } from '@/api/form'
import { exportJsonToExcel } from '../../excel/Export2Excel'
import { formatDate } from '../../utils/date'
const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' },
    width: 50,
    align: 'center',
    fixed: 'left'
  },

  {
    title: '姓名',
    dataIndex: 'username',
    align: 'center'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    scopedSlots: { customRender: 'sexT' },
    align: 'center'
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    align: 'center'
  },
  /* {
    title: '身份证号',
    dataIndex: 'idCard',
    align: 'center'
  }, */
  {
    title: '总金额',
    dataIndex: 'totalAmount',
    align: 'center'
  },
  {
    title: '支付金额',
    dataIndex: 'payment',
    align: 'center'
  },

  {
    title: ' 待支付金额',
    scopedSlots: { customRender: 'daiHuanKuan' },
    align: 'center'
  },
  {
    title: '分期次数',
    dataIndex: 'numberStages',
    align: 'center'
  },
  /*  {
    title: '地址',
    dataIndex: 'address',
    width: 200,
    align: 'center'
  }, */

  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    align: 'center'
  },
  {
    title: '手续',
    dataIndex: 'formalities',
    scopedSlots: { customRender: 'formalities' },
    align: 'center'
  },
  {
    title: '下次考试时间',
    dataIndex: 'nextTime',
    scopedSlots: { customRender: 'nextTime' },
    width: 160,
    align: 'center'
  },
  /* {
    title: '更新时间',
    dataIndex: 'updateTime',
    scopedSlots: { customRender: 'updateTime' },
    width: 160,
    align: 'center'
  }, */
  {
    title: '操作',
    scopedSlots: { customRender: 'actions' },
    width: 150,
    align: 'center',
    fixed: 'right'
  }
]

export default {
  mixins: [queryFormMixin, tableMixin, rangePickerMixin],

  components: { AccountModal, AddPaymentModal },
  filters: {
    roleFilter (roleId, roleOptions) {
      let role = null
      roleOptions.forEach(item => {
        if (item.value === roleId) {
          role = item
        }
      })
      return role.label
    }
  },
  data () {
    return {
      // 查询条件
      form: {},
      // 当前选中行
      selectedRowKeys: [],
      // 角色下拉框 备选项
      roleOptions: [],
      visibleAccount: false,
      visible: false,
      total: 0,
      payment: 0,
      currentAccount: null,
      tableData: null
    }
  },
  computed: {
    rowSelection () {
      const self = this
      return {
        selectedRowKeys: self.selectedRowKeys,
        onChange: (keys, rows) => {
          self.selectedRowKeys = keys
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.status === 1
          }
        })
      }
    },
    isDisabled () {
      return this.selectedRowKeys.length === 0
    }
  },
  methods: {
    async search () {
      this.tableLoading = true
      const { current, pageSize } = this.pagination
      const res = await getStudent({
        ...this.form,
        current,
        pageSize
      })

      this.rows = res.results.student.records
      this.total = res.results.tongJi.total
      this.payment = res.results.tongJi.payment
      this.pagination.total = res.results.student.total
      this.tableLoading = false
    },
    openNotification () {
      this.$notification.open({
        message: '恭喜',
        description:
          '提交成功',
        onClick: () => {
          console.log('Notification Clicked!')
        }
      })
    },
    openNotification1 () {
      this.$notification.open({
        message: '异常',
        description:
          '请联系管理员',
        onClick: () => {
          console.log('Notification Clicked!')
        }
      })
    },
    handleSearch () {
      this.pagination.current = 1
      this.search()
    },
    async onCreate () {
      const res111 = await bland()
      console.info('获取信息')
      // eslint-disable-next-line no-invalid-regexp
      console.info(res111.data.ret)
      if (res111.data.ret === undefined) {
        let newMsg = res111.data.replace(/\\/g, '\\\\')
        let json = JSON.parse(newMsg)

        if (json.ret === 0) {
          if (json.Certificate.Sex === '男') {
            json.Certificate.Sex = '1'
          } else if (json.Certificate.Sex === '女') {
            json.Certificate.Sex = '0'
          }
          this.currentAccount = {
            username: json.Certificate.Name,
            sex: json.Certificate.Sex,
            birthday: json.Certificate.Birthday,
            idCard: json.Certificate.IDNumber,
            status: '1',
            address: json.Certificate.Address
          }
        } else {

        }
        console.info('获取信息')
      }

      this.visible = true
    },
    addPayment (row) {
      this.currentAccount = row
      this.visible = true
    },
    onEdit (row) {
      this.currentAccount = row
      this.visible = true
    },
    showPayment (row) {
      this.currentAccount = row
      this.visibleAccount = true
    },
    async passExam1 (row) {
      const self1 = this

      const res111 = await passExam({ id: row.id })
      if (res111.code === 0) {
        self1.openNotification()
        self1.search()
      } else {
        this.openNotification1()
      }
    },
    async nopassExam1 (row) {
      const self1 = this

      const res111 = await nopassExam({ id: row.id })
      if (res111.code === 0) {
        self1.openNotification()
        self1.search()
      } else {
        this.openNotification1()
      }
    },
    showConfirm (row) {
      const _this = this
      _this.$confirm({
        title: ' 该学员是否通过(科目' + row.status + ')的考试',
        content: '确定后通过并产生下一科目的时间',
        onOk () {
          _this.passExam1(row)
        },
        onCancel () {}
      })
    },
    showNoConfirm (row) {
      const _this = this
      _this.$confirm({
        title: ' 该学员是否没有通过(科目' + row.status + ')的考试',
        content: '确定后通过重新分配科目考试的时间',
        onOk () {
          _this.nopassExam1(row)
        },
        onCancel () {}
      })
    },
    async onDelete (id) {
      const self = this
      this.$confirm({
        title: '删除',
        content: `确定要删除选该用户吗？`,
        okText: '删除',
        okType: 'danger',
        async onOk () {
          await deleteAccount(id)
          self.$message.success('删除成功')
          self.search()
        },
        onCancel () {
          self.$message.warning('取消删除')
        }
      })
    },
    async queryRoles () {
      const res = await getRoles()
      this.roleOptions = res
    },
    onModalClose (isRefresh) {
      // 如果子组件要求父组件刷新
      if (isRefresh) {
        this.search()
      }
      // 关闭 modal时清空currentAccount，防止 新增/修改 混乱
      this.currentAccount = null
      this.visible = false
    },
    onModalAccountClose (isRefresh) {
      // 如果子组件要求父组件刷新
      if (isRefresh) {
        this.search()
      }
      // 关闭 modal时清空currentAccount，防止 新增/修改 混乱
      this.currentAccount = null
      this.visibleAccount = false
    },
    // 导出的方法
    async exportExcel () {
      let keys = this.selectedRowKeys
      const res = await getExcle({
        ...this.form,
        keys
      })

      const list = res.results // 把data里的tableData存到list
      require.ensure([], () => {
        const tHeader = ['序号', '姓名', '手机号', '性别', '出生年月', '身份证号', '状态', '下次考试时间', '手续', '户口所在地']
        // 上面设置Excel的表格第一行的标题
        const filterVal = ['id', 'username', 'phone', 'sex', 'birthday', 'idCard', 'status', 'nextTime', 'formalities', 'address']
        // 上面的index、nickName、name是tableData里对象的属性

        for (let i = 0; i < list.length; i++) {
          /* 如要导出名字，则自定义name属性 */
          if (list[i].sex === '1') {
            list[i].sex = '男'
          } else if (list[i].sex === '0') {
            list[i].sex = '女'
          }
          list[i].nextTime = formatDate(new Date(list[i].nextTime), 'yyyy-MM-dd_hh:mm')
          if (list[i].status === '1') {
            list[i].status = '科目一'
          } else if (list[i].status === '2') {
            list[i].status = '科目二'
          } else if (list[i].status === '3') {
            list[i].status = '科目三'
          } else if (list[i].status === '4') {
            list[i].status = '科目四'
          } else if (list[i].status === '5') {
            list[i].status = '完成考试'
          }
          list[i].name = list[i].lastname + '对的'
        }

        const data = this.formatJson(filterVal, list)
        /* original data */

        let myDate = formatDate(new Date(), 'yyyy-MM-dd_hh:mm')

        exportJsonToExcel(tHeader, data, '学员信息' + myDate)
      })
    },

    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  },
  created () {
    this.columns = columns

    this.search()
  }
}
</script>
