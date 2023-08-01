<template>
  <div>
    <v-row>
      <v-col cols="12" class="mt-5">
        <v-row>
          <v-col cols="7">
            <v-row>
              <v-col cols="12">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="search"
                      label="ຄົ້ນຫາ"
                      outlined
                      hide-details
                      dense
                      prepend-inner-icon="mdi-magnify"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      v-model="category_id"
                      :items="category_data"
                      outlined
                      dense
                      clearable
                      item-text="name"
                      item-value="id"
                      label="ເລືອກປະເພດສິນຄ້າ"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="scroll-container">
                <v-row>
                  <v-col
                    v-for="(item, index) in filteredRow"
                    :key="index"
                    cols="3"
                    class="ma-0 py-1 px-1"
                  >
                    <v-card
                      v-ripple
                      max-width="180px"
                      elevation="10"
                      class="cursor"
                      @click="AddToOrder(item.id)"
                    >
                      <div class="">
                        <v-img
                          :src="item.profile"
                          contain
                          style="
                            width: 100%;
                            height: 140px;
                            object-fit: cover;
                            object-position: center;
                          "
                        >
                          <div v-for="li in ListOrder" :key="li.id">
                            <v-chip
                              v-if="item.id === li.id"
                              small
                              color="blue"
                              class="box-item rounded-bl-xl"
                              label
                            >
                              {{ li.order_amount }}</v-chip
                            >
                          </div>

                          <v-chip
                            v-if="item.quatity === 0"
                            small
                            class="green white--text rounded-br-xl ma-n2"
                            label
                          >
                            ໝົດ!
                          </v-chip>
                        </v-img>
                        <v-card-text>
                          <div class="font-weight-black">
                            {{
                              item.name.length <= 15
                                ? item.name
                                : item.name?.slice(0, 10) + '...'
                            }}
                          </div>
                          <div class="info--text">{{ formatPrice(item.sale_price) }}kip</div>
                        </v-card-text>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-dialog v-model="dialog" max-width="600px">
                  <v-card>
                    <div class="modal-dialog">
                      <div class="pa-10">
                        <div class="d-flex justify-space-between">
                          <h4 id="myModalLabel" class="modal-title">
                            ຊຳລະສິນຄ້າ
                          </h4>
                          <v-btn text @click="dialog = false"
                            ><v-icon color="red">mdi-close</v-icon></v-btn
                          >
                        </div>
                        <div class="modal-body">
                          <h4
                            class="card-title text-info d-flex justify-space-between"
                          >
                            <span> <strong> ລວມຍອດເງິນ: </strong></span>
                            <span
                              ><strong
                                >{{ formatPrice(TotalAmount) }} ກີບ</strong
                              ></span
                            >
                          </h4>
                          <!-- _____________________ get money for customer for Dollar_______________ -->

                          <div v-if="exchangeDollar !== null">
                            <h4
                              class="card-title text-info d-flex justify-space-between"
                            >
                              <span> <strong> ເງີນໂດລາຖືກ: </strong></span>
                              <span
                                ><strong
                                  >{{ formatPrice(Dollar) }} ໂດລາ</strong
                                ></span
                              >
                            </h4>
                            <h4
                              class="card-title text-info d-flex justify-space-between"
                            >
                              <span> <strong> ຮັບເງິນນຳລູກຄ້າ: </strong></span>
                              <span
                                ><strong>
                                  {{ formatPrice(CashAmount) }} ໂດລາ</strong
                                ></span
                              >
                            </h4>
                            <h4
                              class="card-title text-danger d-flex justify-space-between"
                            >
                              <span> <strong> ເງິນທອນ: </strong></span>
                              <span
                                ><strong
                                  >{{
                                    formatPrice(calculatedCashBack)
                                  }}
                                  ໂດລາ</strong
                                ></span
                              >
                            </h4>
                            <h4
                              class="card-title text-danger d-flex justify-space-between"
                            >
                              <span> <strong> ເງິນທອນ: </strong></span>
                              <span
                                ><strong
                                  >{{
                                    formatPrice(
                                      calculatedCashBack * exchangeDollar
                                    )
                                  }}
                                  ກີບ</strong
                                ></span
                              >
                            </h4>
                          </div>
                          <!-- _____________________ get money for customer for bath_______________ -->
                          <div v-if="exchangeBath !== null">
                            <h4
                              class="card-title text-info d-flex justify-space-between green--text"
                            >
                              <span> <strong> ເງິນບາດຖືກ: </strong></span>
                              <span
                                ><strong
                                  >{{ formatPrice(Bath) }} ບາດ</strong
                                ></span
                              >
                            </h4>
                            <h4
                              class="card-title text-info d-flex justify-space-between"
                            >
                              <span> <strong> ຮັບເງິນນຳລູກຄ້າ: </strong></span>
                              <span
                                ><strong>
                                  {{ formatPrice(CashAmount) }} ບາດ</strong
                                ></span
                              >
                            </h4>
                            <h4
                              class="card-title text-danger d-flex justify-space-between"
                            >
                              <span> <strong> ເງິນທອນ: </strong></span>
                              <span
                                ><strong
                                  >{{
                                    formatPrice(calculatedCashBack)
                                  }}
                                  ບາດ</strong
                                ></span
                              >
                            </h4>

                            <h4
                              class="card-title text-danger d-flex justify-space-between"
                            >
                              <span> <strong> ເງິນທອນ: </strong></span>
                              <span
                                ><strong
                                  >{{
                                    formatPrice(
                                      calculatedCashBack * exchangeBath
                                    )
                                  }}
                                  ກີບ</strong
                                ></span
                              >
                            </h4>
                          </div>
                          <!-- _____________________ get money for customer for kid_______________ -->
                          <div
                            v-if="
                              exchangeBath === null && exchangeDollar === null
                            "
                          >
                            <h4
                              class="card-title text-info d-flex justify-space-between"
                            >
                              <span> <strong> ຮັບເງິນນຳລູກຄ້າ: </strong></span>
                              <span
                                ><strong>
                                  {{ formatPrice(CashAmount) }} ກີບ</strong
                                ></span
                              >
                            </h4>
                            <h4
                              class="card-title text-danger d-flex justify-space-between"
                            >
                              <span> <strong> ເງິນທອນ: </strong></span>
                              <span
                                ><strong
                                  >{{
                                    formatPrice(calculatedCashBack)
                                  }}
                                  ກີບ</strong
                                ></span
                              >
                            </h4>
                          </div>

                          <!-- __________________________calculater ___________________ -->
                          <div class="form-group">
                            <v-text-field
                              v-model="CashAmount"
                              type="number"
                              outlined
                              class="form-control"
                              :style="{ textAlign: 'right' }"
                            />
                          </div>
                          <div class="justify-space-center d-flex">
                            <v-row style="width: 250px">
                              <v-col
                                cols="4"
                                class="white--text text-center my-n1"
                              >
                                <v-btn block @click="AddNum(1)">1</v-btn>
                              </v-col>
                              <v-col
                                cols="4"
                                class="white--text text-center my-n1"
                              >
                                <v-btn block @click="AddNum(2)">2</v-btn>
                              </v-col>
                              <v-col
                                cols="4"
                                class="white--text text-center my-n1"
                              >
                                <v-btn block @click="AddNum(3)">3</v-btn>
                              </v-col>
                              <v-col
                                cols="4"
                                class="white--text text-center my-n1"
                              >
                                <v-btn block @click="AddNum(4)">4</v-btn>
                              </v-col>
                              <v-col
                                cols="4"
                                class="white--text text-center my-n1"
                              >
                                <v-btn block @click="AddNum(5)">5</v-btn>
                              </v-col>
                              <v-col
                                cols="4"
                                class="white--text text-center my-n1"
                              >
                                <v-btn block @click="AddNum(6)">6</v-btn>
                              </v-col>
                              <v-col
                                cols="4"
                                class="white--text text-center my-n1"
                              >
                                <v-btn block @click="AddNum(7)">7</v-btn>
                              </v-col>
                              <v-col
                                cols="4"
                                class="white--text text-center my-n1"
                              >
                                <v-btn block @click="AddNum(8)">8</v-btn>
                              </v-col>
                              <v-col
                                cols="4"
                                class="white--text text-center my-n1"
                              >
                                <v-btn block @click="AddNum(9)">9</v-btn>
                              </v-col>
                              <v-col
                                cols="4"
                                class="white--text text-center my-n1"
                              >
                                <v-btn block @click="AddNum('00')">00</v-btn>
                              </v-col>
                              <v-col
                                cols="4"
                                class="white--text text-center my-n1"
                              >
                                <v-btn block @click="AddNum('0')">0</v-btn>
                              </v-col>
                              <v-col
                                cols="4"
                                class="white--text text-center my-n1"
                              >
                                <v-btn block @click="AddNum('-')"
                                  ><v-icon>mdi-arrow-left</v-icon></v-btn
                                >
                              </v-col>
                            </v-row>
                          </div>
                          <div
                            class="row justify-content-center d-flex mt-2 text-center"
                          >
                            <v-btn
                              type="button"
                              class="mt-5 cyan accent-4 white--text"
                              width="100%"
                              :loading="loading"
                              @click="ConfirmPay()"
                            >
                              <!-- :disabled="CheckCPay" -->
                              <v-icon>mdi-money</v-icon> ຢືນຍັນຊຳລ່ະເງິນ
                            </v-btn>
                          </div>
                          <v-card-actions>
                            <div class="d-flex">
                              <div v-if="exchangeBath !== null">
                                1ບາດຖືກ:<br />
                                {{ formatPrice(exchangeBath) }} ກີບ
                              </div>
                              <div v-if="exchangeDollar !== null">
                                1ໂດລາຖືກ:<br />
                                {{ formatPrice(exchangeDollar) }} ກີບ
                              </div>
                            </div>
                            <v-divider vertical class="mx-2"></v-divider>
                            <v-spacer></v-spacer>
                            <v-select
                              v-model="exchange_id"
                              :items="getExchange"
                              filled
                              dense
                              item-value="id"
                              item-text="name"
                              label="ສະກຸນເງິນ"
                              class="mt-2"
                              required
                              @change="onExchangeSelect"
                            ></v-select>
                          </v-card-actions>
                        </div>
                      </div>
                      <!-- /.modal-content -->
                    </div>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="5">
            <v-card>
              <v-row class="px-2">
                <v-col cols="12" class="d-flex justify-space-between">
                  <div>ລວມຍອດເງິນ</div>
                  <div>{{ formatPrice(TotalAmount) }} ກີບ</div>
                </v-col>
                <v-col cols="12" class="my-n5 d-flex">
                  <Customer-home-page />
                  <v-divider vertical class="mx-1"></v-divider>

                  <v-btn
                    class="cyan accent-4 white--text"
                    width="70%"
                    :disabled="check_pay"
                    @click="btPay()"
                    ><v-icon>mdi-currency-usd</v-icon>ຊຳລະເງິນ</v-btn
                  >
                </v-col>

                <v-col cols="12">
                  <table>
                    <tr>
                      <th>ສິນຄ້າ</th>
                      <th>ລາຄາ</th>
                      <th class="px-8">ຈຳນວນ</th>
                      <th>ທັງໝົດ</th>
                      <th class="px-n5">X</th>
                    </tr>
                    <tr v-for="(list, index) in ListOrder" :key="index">
                      <td>
                        {{
                          list.name.length <= 3
                            ? list.name
                            : list.name?.slice(0, 3) + '...'
                        }}
                      </td>
                      <td>{{ formatPrice(list.sale_price) }}ກີບ</td>
                      <td>
                        <div class="d-flex align-center justify-center">
                          <v-btn
                            icon
                            class="cyan accent-4 white--text rounded-0"
                            style="height: 40px; width: 20px"
                            @click="minus(list.id)"
                          >
                            <v-icon>mdi-minus</v-icon>
                          </v-btn>
                          <v-text-field
                            v-model="list.order_amount"
                            dense
                            hide-details
                            outlined
                            filled
                            type="text"
                            class="rounded-0 text-center no-spin-buttons"
                            style="width: 20px"
                            inputmode="numeric"
                            @input="enterKey(list)"
                          />

                          <v-btn
                            icon
                            class="cyan accent-4 white--text rounded-0"
                            style="height: 40px; width: 20px"
                            @click="AddOne(list.id)"
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </div>
                      </td>

                      <td>
                        {{
                          formatPrice(list.sale_price * list.order_amount)
                        }}ກີບ
                      </td>
                      <td class="text-center">
                        <v-btn icon @click="DelOneList(list.id)">
                          <v-icon color="error" large>mdi-close</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </table>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- <v-col  v-if="dialogCustomer" cols="12"> -->
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'LmComputerSale',

  data() {
    return {
      category_id:null,
      exchangeBath: null,
      exchangeDollar: null,
      loading: false,
      dialogCustomer: false,
      exchange_id: null,
      CashAmount: '',
      dialog: false,
      search: null,
      ListOrder: [],
      sale_data: {
        Em_id: null,
        Cus_id: null,
        Sale_date: null,
        Totalkip: null,
        Totalbath: null,
        Totaldollar: null,
      },
      sale_detail_data: {
        Sale_id: null,
        Pro_id: null,
        Exch_id: null,
        Sale_detail_date: null,
        Sale_qty: null,
        Guanranteed: null,
        Date_expired: null,
        Totalkip: null,
      },
    }
  },
  computed: {
    // __________exchange bath________
    Bath() {
      return this.TotalAmount / this.exchangeBath
    },
    Dollar() {
      return this.TotalAmount / this.exchangeDollar
    },
    getExchange() {
      return this.$store.state.exchange.exchange
    },
    TotalQuantity() {
      return this.ListOrder.reduce((num, item) => num + item.order_amount, 0)
    },
    calculatedCashBack() {
      if (this.exchangeBath !== null) {
        return (
          parseInt(this.CashAmount) - this.TotalAmount / this.exchangeBath || 0
        )
      } else if (this.exchangeDollar !== null) {
        return (
          parseInt(this.CashAmount) - this.TotalAmount / this.exchangeDollar ||
          0
        )
      } else {
        return parseInt(this.CashAmount) - parseInt(this.TotalAmount) || 0
      }
    },
    // CheckCPay() {
    //   if (parseInt(this.CashAmount) - parseInt(this.TotalAmount) >= 0) {
    //     return false
    //   } else {
    //     return true
    //   }
    // },
    check_pay() {
      if (this.TotalAmount) {
        return false
      } else {
        return true
      }
    },
    TotalAmount() {
      return this.ListOrder.reduce(
        (num, item) => num + item.sale_price * item.order_amount,
        0
      )
    },
    category_data() {
      return this.$store.state.productType.productTypeData.rows
    },
    filteredRow() {
      const searchTerm = this.search ? this.search.toLowerCase().trim() : ''
    const selectedCategoryId = this.category_id;

      return this.$store.state.product.productData
        .map((item, index) => {
          return {
            index: index + 1,
            ...item,
          }
        })
        .filter((item) => {
          const nameMatch =
            item.name && item.name.toLowerCase().includes(searchTerm)
          const barcodeMatch =
            item.barcode && item.barcode.toLowerCase().includes(searchTerm)
      const categoryFilter = !selectedCategoryId || item.product_type_id === selectedCategoryId;

          return (nameMatch || barcodeMatch) && categoryFilter
        })
    },
  },
  async mounted() {
    await this.$store.dispatch('product/getProductData')
    await this.$store.dispatch('exchange/getExchange')
    await this.$store.dispatch('productType/getAll')


  },

  methods: {

    onExchangeSelect() {
      const item = this.getExchange.find((i) => i.id === this.exchange_id)
      if (item.dollartokip > 0) {
        this.exchangeDollar = item.dollartokip
        this.exchangeBath = null
      }
      if (item.bathtokip > 0) {
        this.exchangeBath = item.bathtokip
        this.exchangeDollar = null
      }
      if (item.dollartokip === 0 && item.bathtokip === 0) {
        this.exchangeDollar = null
        this.exchangeBath = null
      }
    },
    chooseCustomer() {
      this.dialogCustomer = true
    },
    async ConfirmPay() {
      const currentDate = new Date()
      const formattedDate = currentDate.toISOString()
      this.loading = true
      this.sale_detail_data.Sale_detail_date = formattedDate
      this.sale_data.Em_id = this.$cookies.get('id')
      this.sale_data.Sale_date = formattedDate

      this.sale_data.Cus_id = this.$store.state.customer.customer_id
      this.sale_data.Totaldollar = this.Dollar
      this.sale_data.Totalbath = this.Bath

      this.sale_data.Totalkip = this.TotalAmount
      this.sale_data.Totalbath = this.Bath
      this.sale_data.Totaldollar = this.Dollar
      await this.$axios
        .post('http://localhost:2023/sale', this.sale_data)
        .then((response) => {
          this.sale_detail_data.Sale_id = response.data.id

          // send data to sale_detail---------------------------
          this.ListOrder.map((item) => {
            this.sale_detail_data.Pro_id = item.id
            this.sale_detail_data.Exch_id = this.exchange_id
            this.sale_detail_data.Totalkip = item.sale_price
            this.sale_detail_data.Sale_qty = item.order_amount
            return this.$axios.post(
              'http://localhost:2023/sale_detail',
              this.sale_detail_data
            )
          })
          // _____________subtract product quantity___________

          this.ListOrder.map((item) => {
            const id = item.id
            const Qt = item.order_amount
            return this.$axios.put(
              `http://localhost:2023/Product/subtract-quantity/${id}`,
              {
                quantity: Qt,
              }
            )
          })

          this.$router.push('/sale/' + this.sale_detail_data.Sale_id)
          this.$toast.success('ສຳເລັດການຂາຍ')
          this.$store.dispatch('product/getProductData')
          this.loading = false
          this.ListOrder = []
          this.CashAmount = 0
          this.dialog = false
          this.sale_data.Em_id = null
          this.sale_data.Cus_id = null
          this.sale_data.Sale_date = null
          this.sale_data.Totalkip = null
          this.sale_data.Totalbath = null
          this.sale_data.Totaldollar = null
          this.exchange_id = null
        })
        .catch((error) => {
          this.$toast.error(error)
        })
    },
    AddNum(num) {
      if (num === '-') {
        this.CashAmount = this.CashAmount.slice(0, -1)
      } else {
        this.CashAmount = this.CashAmount + num
      }
    },
    btPay() {
      this.dialog = true
    },
    enterKey(data) {
      const item = this.filteredRow.find((i) => i.id === data.id)
      const inputNumber = parseInt(data.order_amount)

      if (isNaN(inputNumber)) {
        data.order_amount = null
        return
      }
      if (inputNumber > item.quatity) {
        alert(`ສິນຄ້າໝົດ!!! ຈຳນວນໃນປະຈຸບັນແມ່ນ ${item.quatity}`)
        data.order_amount = null
      }
    },
    DelOneList(id) {
      this.ListOrder.splice(this.ListOrder.map((i) => i.id).indexOf(id), 1)
    },
    AddOne(id) {
      const item = this.filteredRow.find((i) => i.id === id)
      const listOrder = this.ListOrder.find((i) => i.id === id)

      if (listOrder) {
        const oldOrderAmount = listOrder.order_amount
        if (item.quatity - oldOrderAmount > 0) {
          listOrder.order_amount = oldOrderAmount + 1
        } else {
          // alert('ສີນຄ້າໝົດ')
          alert('ສີນຄ້າໝົດ!')
        }
      }
    },
    minus(id) {
      if (this.ListOrder.find((i) => i.id === id)) {
        const oldOrderAmount = this.ListOrder.find(
          (i) => i.id === id
        ).order_amount

        if (oldOrderAmount - 1 > 0) {
          this.ListOrder.find((i) => i.id === id).order_amount =
            oldOrderAmount - 1
        } else {
          const indexToRemove = this.ListOrder.map((i) => i.id).indexOf(id)
          this.ListOrder.splice(indexToRemove, 1)
        }
      }
    },
    AddToOrder(id) {
      const item = this.filteredRow.find((i) => i.id === id)
      const listOrder = this.ListOrder.find((i) => i.id === id)
      if (listOrder) {
        const oldOrderAmount = listOrder.order_amount
        if (item.quatity - oldOrderAmount > 0) {
          const existingOrder = this.ListOrder.find((i) => i.id === id)
          if (existingOrder) {
            existingOrder.order_amount++
          } else {
            this.ListOrder.push({
              id: item.id,
              name: item.name,
              sale_price: item.sale_price,
              category: item.category,
              order_amount: 1,
            })
          }
        } else {
          alert('ສີນຄ້າໝົດ')
        }
      } else {
        const chnum = this.filteredRow.find((i) => i.id === id)
        if (chnum) {
          if (chnum.quatity > 0) {
            const existingOrder = this.ListOrder.find((i) => i.id === id)
            if (existingOrder) {
              existingOrder.order_amount++
            } else {
              this.ListOrder.push({
                id: item.id,
                name: item.name,
                category: item.category,
                sale_price: item.sale_price,
                order_amount: 1,
              })
            }
          } else {
            alert('ສີນຄ້າໝົດ')
          }
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.no-spin-buttons::-webkit-inner-spin-button,
.no-spin-buttons::-webkit-outer-spin-button,
.no-spin-buttons::-moz-inner-spin-button,
.no-spin-buttons::-moz-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
// box text number
.box-item {
  position: absolute;
  right: 0;
  // font-weight: bold;
  padding: 5px;
  // border-radius: 0px 0px 0px 10px;
}
table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd; /* Add border to the table */
}

th,
td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd; /* Add border to the cells */
  border-right: 1px solid #ddd; /* Add border to the right side of cells */
}

th {
  background-color: #f2f2f2;
  text-align: center; /* Align header text in the center */
}

th:last-child,
td:last-child {
  border-right: none; /* Remove border from the last column */
}

.d-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.text-center {
  text-align: center;
}

//************************** */
.modal-dialog {
  margin: 0 auto;
  max-width: 600px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
}

.modal-body {
  padding: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.btn-primary {
  background-color: blue;
  color: white;
}

.btn-danger {
  background-color: red;
  color: white;
}

.btn-success {
  background-color: green;
  color: white;
}

.btn-info {
  background-color: blue;
  color: white;
}

.text-info {
  color: blue;
}

.text-danger {
  color: red;
}

.text-success {
  color: green;
}

.btn-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.btn-close::after {
  content: '×';
  font-size: 1.5rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
}

.col-4 {
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  padding-right: 10px;
  padding-left: 10px;
}

.mt-2 {
  margin-top: 0.5rem;
}

.text-center {
  text-align: center;
}

.justify-content-center {
  justify-content: center;
}

.text-white {
  color: white;
}

.btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}

.btn-primary:hover,
.btn-primary:focus {
  background-color: darkblue;
}

.btn-danger:hover,
.btn-danger:focus {
  background-color: darkred;
}

.btn-success:hover,
.btn-success:focus {
  background-color: darkgreen;
}

.btn-info:hover,
.btn-info:focus {
  background-color: darkblue;
}

.btn-primary:disabled,
.btn-danger:disabled,
.btn-success:disabled,
.btn-info:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-close:hover,
.btn-close:focus {
  color: red;
}

.btn-close:hover::after,
.btn-close:focus::after {
  color: red;
}

.btn-close:focus {
  outline: none;
}

.text-info {
  color: blue;
}

.text-danger {
  color: red;
}

.text-success {
  color: green;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.w-250 {
  width: 250px;
}
.scroll-container {
  height: 560px;
  overflow-y: auto;
}
</style>
