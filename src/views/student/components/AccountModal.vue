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
          <a-input
            v-decorator="[
            'username',
            {
              initialValue: account && account.username,
              rules: [
                { required: true, message: '请输入性别!' }
              ]
            }
          ]"
            :disabled="!!account"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="年龄">
          <a-input
            v-decorator="[
            'username',
            {
              initialValue: account && account.username,
              rules: [
                { required: true, message: '请输入年龄!' }
              ]
            }
          ]"
            :disabled="!!account"
          />
        </a-form-item>
          <a-form-item v-bind="formItemLayout" label="支付金额" >
            <a-input
              v-decorator="[
            'contacts',
            {
              initialValue: account && account.contacts,
              rules: [ {required: true, message: '请输入支付金额!'} ]
            }
          ]"
            /></a-form-item>
          <a-form-item v-bind="formItemLayout" label="总金额">
            <a-input
              v-decorator="[
            'username',
            {
              initialValue: account && account.username,
              rules: [
                { required: true, message: '请输入总金额!' }
              ]
            }
          ]"
              :disabled="!!account"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="分期次数">
            <a-input
              v-decorator="[
            'username',
            {
              initialValue: account && account.username,
              rules: [
                { required: true, message: '分期次数!' }
              ]
            }
          ]"
              :disabled="!!account"
            />
          </a-form-item>
        </a-col>
        <a-col
          :span="12"
          :style="{ display: 'block' }"
        >

      <a-form-item v-bind="formItemLayout" label="身份证地址">
        <a-textarea
          v-decorator="[
            'address',
            {
              initialValue: account && account.address,
              rules: [ {required: true, message: '请输入身份证地址!'} ]
            }
          ]"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="现住址">
        <a-textarea
          v-decorator="[
            'address',
            {
              initialValue: account && account.address,
              rules: [ {required: true, message: '请输入现住址!'} ]
            }
          ]"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="身份证号">
        <a-input
          v-decorator="[
            'username',
            {
              initialValue: account && account.username,
              rules: [
                { required: true, message: '请输入身份证号!' }
              ]
            }
          ]"
          :disabled="!!account"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="角色">
        <a-select
          v-decorator="[
            'roleId',
            {
              initialValue: account && account.roleId,
              rules: [ {required: true, message: '请选择角色!'} ]
            }
          ]"
          :options="roleOptions"
        ></a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="状态">
        <a-select
          v-decorator="[
              'status',
              {
                initialValue: account && account.status,
                rules: [ {required: true, message: '请选择状态!'} ]
              }
            ]"
        >
          <a-select-option :value="1">启用</a-select-option>
          <a-select-option :value="0">禁用</a-select-option>
        </a-select>
      </a-form-item>

        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { createAccount, modifyAccount, getRoles } from '@/api/form'
import ATextarea from 'ant-design-vue/es/input/TextArea'

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
