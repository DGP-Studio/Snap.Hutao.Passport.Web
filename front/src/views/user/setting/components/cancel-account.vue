<template>
  <!-- get verify code -->
  {{ props.visible }}
  <a-modal :visible="props.visible" :mask-closable="false" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      {{ $t('userSetting.SecuritySettings.button.cancelAccount') }}
    </template>
    <div>You can customize modal body text by the current situation. This modal
      will be closed immediately once you press the OK button.</div>
  </a-modal>
</template>

<script setup lang="ts">
const props = defineProps<{ visible: boolean }>();
const emit = defineEmits(['update:visible']);
const handleOk = () => {
  emit('update:visible', false);
};
const handleCancel = () => {
  emit('update:visible', false);
};
</script>

<style scoped></style>

