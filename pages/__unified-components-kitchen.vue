<script setup>

/* page */

useHead({
  title: 'Unified Components Kitchen Sink',
});


</script>


<template>
  <div>

    <div class="pa-4">

      <div class="text-lg font-bold">
        Buttons
      </div>

      <div class="flex gap-2 mt-3">

        <u-btn
          color="primary"
          label="Testing"
        />

        <u-btn
          variant="outline"
          label="Testing"
          color="info"
          icon="i-heroicons-user"
        />

        <u-btn
          variant="light"
          label="Testing"
          color="warning"
          append-icon="i-heroicons-moon"
          disabled
        />

        <u-btn
          variant="fill"
          label="Testing"
          color="danger"
        />

        <u-btn
          variant="fill"
          label="Testing"
          color="primary"
          loading
        />

        <u-btn
          variant="fill"
          color="primary"
          icon="i-heroicons-play"
          icon-only
        />

        <u-btn
          label="Testing"
          color="primary"
          class="text-xs"
        />

        <u-btn
          label="Testing"
          color="primary"
          class="text-xl"
        />

      </div>

    </div>

    <div class="pa-4">

      <div class="text-lg font-bold">
        Spinner
      </div>

      <div class="flex items-start gap-2 mt-3">

        <u-spinner />

        <u-spinner
          class="text-red"
        />

        <u-spinner
          class="text-primary text-2xl"
        />

      </div>

    </div>

    <div class="pa-4">

      <div class="text-lg font-bold">
        Icon
      </div>

      <div class="flex items-start gap-2 mt-3">

        <u-icon
          icon="i-heroicons-user"
        />

        <u-icon
          icon="i-heroicons-home"
          color="primary"
        />

        <u-icon
          icon="i-heroicons-plus"
          color="info"
          class="text-2xl"
        />

      </div>

    </div>

    <div class="pa-4">

      <div class="text-lg font-bold">
        Alert
      </div>

      <div class="flex items-start gap-2 mt-3">

        <u-alert
          color="success"
          icon="i-heroicons-user"
          title="Hello World!"
          text="Your action has succeeded!"
          dismissible
        />

        <u-alert
          variant="fill"
          color="warning"
          icon="i-heroicons-user"
          title="Watch Out!"
          text="Your action is dangerous!">

          <u-btn color="red" icon="i-heroicons-play" class="mt-2">
            Do It!
          </u-btn>

        </u-alert>

      </div>

    </div>

    <div class="pa-4">

      <div class="text-lg font-bold">
        Avatar
      </div>

      <div class="flex gap-2 mt-3">

        <u-avatar
          icon="i-heroicons-user"
        />

        <u-avatar
          src="https://picsum.photos/200"
        />

        <u-avatar
          content="H"
        />

        <u-avatar
          src="https://picsum.photos/200"
          class="w-64px h-64px"
        />

        <u-avatar>
          J
        </u-avatar>

      </div>

    </div>

    <div class="pa-4">

      <div class="text-lg font-bold">
        Badge
      </div>

      <div class="flex gap-5 mt-3">

        <u-badge>
          <u-avatar src="https://picsum.photos/200" />
        </u-badge>

        <u-badge :content="7">
          <u-avatar src="https://picsum.photos/200" />
        </u-badge>

        <u-badge :content="7" :max="3">
          <u-avatar src="https://picsum.photos/200" />
        </u-badge>

        <u-badge content="dangerous!" color="danger">
          <u-btn
            color="danger"
            label="Delete User"
          />
        </u-badge>

      </div>

    </div>

    <div class="pa-4">

      <div class="text-lg font-bold">
        Card
      </div>

      <div class="flex items-start gap-4 mt-3">

        <u-card class="pa-3">
          Hello All
        </u-card>

        <u-card
          title="Hello To Title"
          subtitle="Goodbye to subtitle"
          text="This is the text of the thing."
          img="https://picsum.photos/300/100"
        />

        <u-card
          text="This should be loading"
          loading
        />

        <u-card
          variant="fill"
          color="success"
          title="Hello To Title"
          subtitle="Goodbye to subtitle"
          text="This is the text of the thing."
        />

        <u-card
          icon="i-heroicons-user"
          append-icon="i-heroicons-plus"
          title="Hello To Title"
          subtitle="Goodbye to subtitle"
          text="This is the text of the thing. This is the text of the thing."
        />

      </div>

    </div>

  </div>
</template>