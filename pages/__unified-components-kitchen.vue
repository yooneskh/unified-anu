<script setup>

/* page */

useHead({
  title: 'Unified Components Kitchen Sink',
});


const model1 = ref(false);
const model2 = ref(false);
const model3 = ref(false);
const model4 = ref(false);
const model5 = ref('');
const model6 = ref('');
const model7 = ref(0);

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
        Loading Icon
      </div>

      <div class="flex items-start gap-2 mt-3">

        <u-loading-icon
          icon="i-heroicons-user"
        />

        <u-loading-icon
          icon="i-heroicons-user"
          loading
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

    <div class="pa-4">

      <div class="text-lg font-bold">
        Checkbox
      </div>

      <div class="flex items-start gap-4 mt-3">

        <u-checkbox
          label="Hello"
          v-model="model1"
        />

        <u-checkbox
          label="Hello"
          icon="i-heroicons-user"
          v-model="model1"
        />

        <u-checkbox
          label="Hello"
          icon="i-heroicons-user"
          color="warning"
          v-model="model1"
        />

        <u-checkbox
          label="Hello"
          disabled
          v-model="model1"
        />

        <u-checkbox
          label="Hello"
          cycle-indeterminate
          indeterminate-value="5"
          v-model="model1"
        />

      </div>

    </div>

    <div class="pa-4">

      <div class="text-lg font-bold">
        Chip
      </div>

      <div class="flex items-start gap-2 mt-3">

        <u-chip
          label="Hello"
        />

        <u-chip
          color="danger"
          label="Danger!"
        />

        <u-chip
          variant="fill"
          color="warning"
          label="Warn!"
        />

        <u-chip
          variant="fill"
          color="success"
          label="New User"
          append-icon="i-heroicons-user"
        />

        <u-chip
          variant="outline"
          label="Up and Down"
          icon="i-heroicons-chevron-down"
          append-icon="i-heroicons-chevron-up"
        />

        <u-chip
          label="What to do?"
          closable
        />

      </div>

    </div>

    <div class="pa-4">

      <div class="text-lg font-bold">
        Base Input
      </div>

      <div class="flex items-start gap-2 mt-3">

        <u-base-input
          label="Field Label">
          Content
        </u-base-input>
        
        <u-base-input
          label="Field Label"
          prepend-icon="i-heroicons-plus"
          append-icon="i-heroicons-plus"
          prepend-inner-icon="i-heroicons-plus"
          append-inner-icon="i-heroicons-plus">
          Content
        </u-base-input>
        
        <u-base-input
          label="Field Label"
          input-wrapper-classes="bg-red"
          input-classes="text-blue">
          Content
        </u-base-input>

        <u-base-input
          label="Field Label"
          hint="Do this">
          Content
        </u-base-input>
        
        <u-base-input
          label="Field Label"
          success="Correct">
          Content
        </u-base-input>

        <u-base-input
          label="Field Label"
          error="Nope">
          Content
        </u-base-input>

      </div>

    </div>

    <div class="pa-4">

      <div class="text-lg font-bold">
        Loader
      </div>

      <div class="flex items-start gap-2 mt-3">

        <div class="relative h-100px w-100px rounded shadow">
          <u-loader loading />
        </div>

        <div class="relative h-160px w-200px rounded shadow">
          <u-loader loading title="Hello" subtitle="You should see" />
        </div>

      </div>

    </div>

    <div class="pa-4">

      <div class="text-lg font-bold">
        Dialog
      </div>

      <div class="flex items-start gap-2 mt-3">

        <u-btn
          label="Open Dialog"
          @click="model2 = !model2;"
        />

        <u-dialog
          v-model="model2"
          icon="i-heroicons-user"
          title="Hello there"
          subtitle="Welcome to here."
          text="This is the greatest things."
        />

      </div>

    </div>

    <div class="pa-4">

      <div class="text-lg font-bold">
        Drawer
      </div>

      <div class="flex items-start gap-2 mt-3">

        <u-btn
          label="Open Drawer"
          @click="model3 = !model3;"
        />

        <u-drawer
          v-model="model3"
          icon="i-heroicons-user"
          title="Hello there"
          subtitle="Welcome to here."
          text="This is the greatest things.">

          <p class="px-5 mt-4">
            Rest of the content.
          </p>

        </u-drawer>

        <u-btn
          label="Open Top Drawer"
          @click="model4 = !model4;"
        />

        <u-drawer
          v-model="model4"
          anchor="top"
          icon="i-heroicons-user"
          title="Hello there"
          subtitle="Welcome to here."
          text="This is the greatest things.">

          <p class="px-5 mt-4">
            Rest of the content.
          </p>

        </u-drawer>

      </div>

    </div>

    <div class="pa-4">

      <div class="text-lg font-bold">
        Menu
      </div>

      <div class="flex items-start gap-2 mt-3">

        <u-btn label="Menu">
          <u-menu>
            Hi There!
          </u-menu>
        </u-btn>

        <u-btn label="Menu Top">
          <u-menu placement="top-start">
            Hi There!
          </u-menu>
        </u-btn>

        <u-btn label="Menu End">
          <u-menu placement="right-center">
            Hi There!
          </u-menu>
        </u-btn>

        <u-btn label="Menu Persist">
          <u-menu placement="top-center" persist>
            Hi There!
          </u-menu>
        </u-btn>

        <u-btn label="Menu Hover">
          <u-menu placement="top-center" trigger="hover">
            Hi There!
          </u-menu>
        </u-btn>

      </div>

    </div>

    <div class="pa-4">

      <div class="text-lg font-bold">
        Tooltip
      </div>

      <div class="flex items-start gap-2 mt-3">

        <u-btn label="Tooltip">
          <u-tooltip
            text="Hello Tooltip!"
          />
        </u-btn>

        <u-btn label="Tooltip Right">
          <u-tooltip
            text="Hello Tooltip!"
            placement="right"
          />
        </u-btn>

        <u-btn label="Tooltip Content">
          <u-tooltip>
            <u-icon icon="i-heroicons-user" />
            Hi
          </u-tooltip>
        </u-btn>

      </div>

    </div>

    <div class="pa-4">

      <div class="text-lg font-bold">
        Input
      </div>

      <div class="flex items-start gap-2 mt-3">

        <u-input
          label="Text Input"
          :hint="model5"
          v-model="model5"
        />

        <u-input
          label="Text Input"
          prepend-icon="i-heroicons-user"
          prepend-inner-icon="i-heroicons-user"
          append-icon="i-heroicons-user"
          append-inner-icon="i-heroicons-user"
          success="This is ok"
        />

      </div>

    </div>

    <div class="pa-4">

      <div class="text-lg font-bold">
        Radio
      </div>

      <div class="flex items-start gap-2 mt-3">

        <u-radio
          label="Male"
          value="male"
          v-model="model6"
        />

        <u-radio
          label="Female"
          value="female"
          v-model="model6"
        />

      </div>

    </div>

    <div class="pa-4">

      <div class="text-lg font-bold">
        Rating
      </div>

      <div class="flex items-start gap-2 mt-3">

        <u-rating
          v-model="model7"
        />

      </div>

    </div>

  </div>
</template>