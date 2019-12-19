<template>
  <!--新增/修改用户模态框-->
  <a-modal

    :visible="visible"
    @ok="onSubmit"
    @cancel="closeModal(false)"
    :maskClosable="false"
    :keyboard="false"
    :confirmLoading="loading"
    :width="1000"
    :title="account ? '编辑学员' : '新增学员'"
  >
    <a-form id="components-form-demo-advanced-search" :form="form"   class="ant-advanced-search-form"  >
      <a-row :gutter="24">
        <a-col
          :span="12"
          :style="{ display: 'block' }"
        >
      <a-form-item v-bind="formItemLayout" label="姓名">
        <a-input
          v-decorator="[
            'username',
            {
              initialValue: account && account.username,
              rules: [
                { required: true, message: '请输入姓名!' }
              ]
            }
          ]"
          :disabled="!!account"
        />
      </a-form-item>

        <a-form-item v-bind="formItemLayout" label="性别">
          <a-select
            v-decorator="[
            'sex',
            {
              initialValue: account && account.sex,
              rules: [ {required: true, message: '请选择角色!'} ]
            }
          ]"

          >
            <a-select-option value="0">女</a-select-option>
            <a-select-option value="1">男</a-select-option>
          </a-select>

        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="年龄">
          <a-input
            v-decorator="[
            'age',
            {
              initialValue: account && account.age,
              rules: [
                { required: false, message: '请输入年龄!' },
                  { pattern: /^[0-9]{1,10}$/g, message: '请输入数字' },
              ]
            }
          ]"

          />
        </a-form-item>
          <a-form-item v-bind="formItemLayout" label="支付金额" >
            <a-input
              v-decorator="[
            'payment',
            {
              initialValue: account && account.payment,
              rules: [
                {required: false, message: '请输入支付金额!'} ,
                  { pattern: /^[0-9]{1,10}$/g, message: '请输入数字' }
                  ]
            }
          ]"
            /></a-form-item>
          <a-form-item v-bind="formItemLayout" label="总金额">
            <a-input
              v-decorator="[
            'totalAmount',
            {
              initialValue: account && account.totalAmount,
              rules: [
                { required: false, message: '请输入总金额!' },
                  { pattern: /^[0-9]{1,10}$/g, message: '请输入数字' },
              ]
            }
          ]"

            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="分期次数">
            <a-input
              v-decorator="[
            'numberStages',
            {
              initialValue: account && account.numberStages,
              rules: [
                { required: false, message: '分期次数!' },
                  { pattern: /^[0-9]{1,10}$/g, message: '请输入数字' }
              ]
            }
          ]"

            />
          </a-form-item>
        </a-col>
        <a-col
          :span="12"
          :style="{ display: 'block' }"
        >
          <a-form-item v-bind="formItemLayout" label="身份证号">
            <a-input
              v-decorator="[
            'idCard',
            {
              initialValue: account && account.idCard,
              rules: [
                { required: true, message: '请输入身份证号!' }

              ]
            }
          ]"

            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="手机号">
            <a-input
              v-decorator="[
            'phone',
            {
              initialValue: account && account.phone,
              rules: [
                { required: true, message: '请输入手机号!' }

              ]
            }
          ]"

            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="性别">
            <a-select
              v-decorator="[
            'sex',
            {
              initialValue: account && account.sex,
              rules: [ {required: true, message: '请选择角色!'} ]
            }
          ]"

            >
              <a-select-option value="0">女</a-select-option>
              <a-select-option value="1">男</a-select-option>
            </a-select>

          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="科目">
            <a-select
              v-decorator="[
            'status',
            {
              initialValue: account && account.status,
              rules: [ {required: true, message: '请选择科目!'} ]
            }
          ]"
            >
              <a-select-option value="1" >科目一</a-select-option>
              <a-select-option value="2">科目二</a-select-option>
              <a-select-option value="3">科目三</a-select-option>
              <a-select-option value="4">科目四</a-select-option>
              <a-select-option value="0">未通过考试</a-select-option>
              <a-select-option value="5">通过所有考试</a-select-option>
            </a-select>

          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="下次考试时间">
            <span  v-if="account.nextTime!=null">
            <a-date-picker
              :defaultValue="moment(account.nextTime, dateFormat)" :format="dateFormat"
            />
               </span>
          </a-form-item>
      <a-form-item v-bind="formItemLayout" label="身份证地址">
        <a-textarea
          v-decorator="[
            'address',
            {
              initialValue: account && account.address,
              rules: [ {required: false, message: '请输入身份证地址!'} ]
            }
          ]"
          :autosize="{ minRows: 2, maxRows: 30 }"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="现住址">
        <a-textarea
          v-decorator="[

            'residentialAddress',
            {
              initialValue: account && account.residentialAddress,
              rules: [ {required: false, message: '请输入现住址!'} ]
            }
          ]"
          :autosize="{ minRows: 2, maxRows: 28 }"
        />
      </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { createAccount, modifyAccount, getRoles } from '@/api/form'
import ATextarea from 'ant-design-vue/es/input/TextArea'
import moment from 'moment'
export default {
  components: { ATextarea },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    account: Object
  },
  data () {
    return {
      form: this.$form.createForm(this),
      roleOptions: [],
      loading: false,
      dateFormat: 'YYYY-MM-DD',
      formItemLayout: {

        labelCol: { span: 5 },
        wrapperCol: { span: 18 }
      }
    }
  },
  computed: {
    count () {
      return this.expand ? 11 : 7
    }
  },
  methods: {
    moment,
    async handleCreateAccount (params) {
      await createAccount(params)
      this.loading = false
      this.$message.success('创建用户成功')
      this.closeModal(true)
    },
    async handleModifyAccount (params) {
      await modifyAccount(params)
      this.loading = false
      this.$message.success('编辑成功')
      this.closeModal(true)
    },
    onSubmit () {
      this.form.validateFields((err, values) => {
        if (err) return

        this.loading = true
        const params = { ...this.account, ...values }
        if (params.id) {
          this.handleModifyAccount(params)
        } else {
          this.handleCreateAccount(params)
        }
      })
    },
    async queryRoles () {
      const res = await getRoles()
      this.roleOptions = res
    },
    closeModal (isRefresh) {
      this.form.resetFields()
      this.$emit('close', isRefresh)
    }
  },
  created () {
    this.queryRoles()
  }
}
</script>
<style>
  .ant-advanced-search-form {
    padding: 24px;
    background: #fbfbfb;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }

  .ant-advanced-search-form .ant-form-item {
    display: flex;
  }

  .ant-advanced-search-form .ant-form-item-control-wrapper {
    flex: 1;
  }

  #components-form-demo-advanced-search .ant-form {
    max-width: none;
  }
  #components-form-demo-advanced-search .search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
</style>
