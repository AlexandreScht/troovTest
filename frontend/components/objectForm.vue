<template>
  <div>
    <v-form v-model="valid">
      <div v-for="(field, index) in formFields" :key="index">
      <v-text-field 
        v-if="field.type === 'text'"
        v-model="field.value"
        :label="field.label"
        :rules="field.rules"
      ></v-text-field>

      <v-autocomplete
        v-else-if="field.type === 'select'"
        v-model="field.value"
        :label="field.label"
        :rules="field.rules"
        :items="field.items ?? null"
      ></v-autocomplete>

      <div
       v-else-if="field.type === 'date'">
        <v-text-field
          v-model="field.value"
          :label="field.label"
          :rules="field.rules"
          readonly
          @click="showPicker = !showPicker"
        ></v-text-field>

        <v-date-picker
          v-show="showPicker"
          v-model="field.value"
          color="primary"
          class="datePicker"
          @input="showPicker = false"
        ></v-date-picker>
      </div>


      <v-file-input 
      v-else-if="field.type === 'file'"
      v-model="field.value"
      :label="field.label"
      :rules="field.rules"
      clearable
      prepend-icon="mdi-camera"
      accept="image/*"
      ></v-file-input>
      </div>
      <v-textarea
        v-model="text"
        label="retail"
        :rows="5"
        outlined
      ></v-textarea>
      <div id="btnContenair">
        <v-btn :disabled="!valid" color="primary" @click="submit(mergeResult())">{{ buttonText }}</v-btn>
        <v-btn v-if="deleteObj" color="error" @click="deleteObj">Delete object</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    formFields: {
      type: Array,
      default: () => [
        {
          type: "text",
          rules: [],
          label: "",
          value: null,
          items: null,
        }
      ],
    },
    buttonText: {
      type: String,
      default: "submit"
    },
    submit: {
      type: Function,
      required: true
    },
    deleteObj: {
      type: Function,
      required: true
    },
  },
  data() {
    return {
      valid: false,
      text: this.description ?? null,
      showPicker: false
    }
  },
  methods: {
    mergeResult() {
      const values = this.formFields.map((objet) => {
        return { [objet.label.replace(/\s/g, "_")]: objet.value }
      })

      if (this.text) {
        values.push({description: this.text})
      }

      return values
    },
    setPickerDate() {
      setTimeout(() => {
        if (this.showPicker) {
          return
        }

        this.showPicker = true
      },100)
    }
  }
}
</script>

<style lang="scss" scoped>
 .content{
  position: relative;
  .datePicker{
    position: absolute;
  }
  #btnContenair{
    display: flex;
    flex-direction: row;
  }
 }
</style>
