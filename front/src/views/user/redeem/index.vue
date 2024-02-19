<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', 'menu.user.redeem']" />
    <a-row style="margin-bottom: 16px">
      <a-col :span="24">
        <a-card :bordered="false">
          <a-form
            ref="formRef"
            :model="formData"
            class="form"
            :label-col-props="{ span: 8 }"
            :wrapper-col-props="{ span: 16 }"
          >
            <a-form-item
              field="email"
              :label="$t('userRedeem.form.code')"
              :rules="[
                {
                  required: true,
                  message: $t('userRedeem.form.error.code.required'),
                },
              ]"
            >
              <a-input
                v-model="formData.code"
                :placeholder="$t('userRedeem.form.placeholder.code')"
              />
            </a-form-item>

            <a-form-item>
              <a-space>
                <a-button type="primary" @click="validate">
                  {{ $t('userRedeem.form.submit') }}
                </a-button>
                <!--                <a-button type="secondary" @click="reset">
                  {{ $t('userRedeem.form.reset') }}
                </a-button>-->
              </a-space>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';

  const formRef = ref<FormInstance>();

  export interface RedeemModel {
    code: string;
  }

  const formData = ref<RedeemModel>({
    code: '',
  });
  const validate = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      // do some thing
      // you also can use html-type to submit
    }
  };
  // const reset = async () => {
  //   await formRef.value?.resetFields();
  // };
</script>

<script lang="ts">
  export default {
    name: 'Redeem',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px;
  }

  .wrapper {
    min-height: 580px;
    padding: 20px 0 0 20px;
    background-color: var(--color-bg-2);
    border-radius: 4px;
  }

  :deep(.section-title) {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 14px;
  }

  .form {
    width: 540px;
    margin: 0 auto;
  }
</style>
