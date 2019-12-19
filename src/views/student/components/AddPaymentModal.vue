<template>
  <!--新增/修改用户模态框-->
  <a-modal

    :visible="visible"
    @ok="onSubmit"
    @cancel="closeModal(false)"
    :maskClosable="false"
    :keyboard="false"
    :confirmLoading="loading"
    :width="500"
    :title="'学员还款'"
  >
    <a-form id="components-form-paymentModal-advanced-search" :form="form"   class="ant-advanced-search-form"  >
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
          <a-form-item v-bind="formItemLayout" label="支付金额" >
            <a-input
              v-decorator="[
            'payment',
            {
              initialValue: account && account.payment,
              rules: [ {required: false, message: '请输入支付金额!'} ]
            }
          ]"
              :disabled="!!account"
            /></a-form-item>
          <a-form-item v-bind="formItemLayout" label="总金额">
            <a-input
              v-decorator="[
            'totalAmount',
            {
              initialValue: account && account.totalAmount,
              rules: [
                { required: false, message: '请输入总金额!' }
              ]
            }
          ]"
              :disabled="!!account"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="分期次数">
            <a-input
              v-decorator="[
            'numberStages',
            {
              initialValue: account && account.numberStages,
              rules: [
                { required: false, message: '分期次数!' }
              ]
            }
          ]"
              :disabled="!!account"
            />
          </a-form-item>
            <a-form-item v-bind="formItemLayout" label="还款金额">
              <a-input
                v-decorator="[
            'repaymentAmount',
            {
              initialValue: account && account.repaymentAmount,
              rules: [
                { required: true, message: '请输入还款金额!' },
                { pattern: /^[0-9]{1,10}$/g, message: '金额必须为10位以内的数字' },
              ]
            }
          ]"
              />
            </a-form-item>

    </a-form>
  </a-modal>
</template>

<script>
import { createAccount, modifyPayment, getRoles } from '@/api/form'

export default {
  components: { },
  props: {
    visible: {
      type: Boolean,
      // default:false,
      required: true
    },
    account: Object
  },
  data () {
    return {
      form: this.$form.createForm(this),
      roleOptions: [],
      loading: false,
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
    async handleCreateAccount (params) {
      await createAccount(params)
      this.loading = false
      this.$message.success('创建用户成功')
      this.closeModal(true)
    },
    async handleModifyAccount (params) {
      await modifyPayment(params)
      this.loading = false
      this.$message.success('还款成功')
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

  #components-form-paymentModal-advanced-search .ant-form {
    max-width: none;
  }
  #components-form-paymentModal-advanced-search .search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
</style>
