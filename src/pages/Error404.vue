<script setup>
import ErrorCard from "../partials/errors/ErrorCard.vue";
</script>

<template>
  <div className="flex h-screen overflow-hidden">
    <div
      className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
    >
      <main>
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div className="flex items-center justify-center">
            <ErrorCard
              code="404"
              message="페이지를 찾지 못했습니다."
            ></ErrorCard>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
