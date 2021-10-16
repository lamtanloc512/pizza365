"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */

// Khai báo biến toàn cục truy xuất phần tử form
let gFormDataSubmit = document.getElementById("form-data-submit");

// Khai báo biến toàn cục để lưu các loại pizza
let gSelectedPizzaType = [];

// khai báo biến voucher khi khách hàng nhập đúng thì giảm giá 20%;
let gDiscountVouchers = ["A1", "B2", "C3", "D4", "E5"];

// Khai báo một object lấy dữ liệu menu pizza
let gMenuDataObject = {
  size: "",
  dimesion: null,
  suongNuong: null,
  saLad: null,
  nuocNgot: null,
  gia: "",
};

/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */

// Thực thi hàm chuyển màu khi ấn nút chọn menu pizza
onClickChangeColorMenu();

// Thực thi hàm chuyển màu khi ấn nút chọn loại pizza
onClickChangeColorPizza();

// Thực thi hàm submit form, khi ấn submit sẽ kiểm tra các trường form và discount;
onSubmitOrderPizza(gSelectedPizzaType, gMenuDataObject);

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */

//khai báo hàm thực thi khi ấn nút chuyển màu MENU COMBO(size pizza) + lay du lieu
function onClickChangeColorMenu() {
  // lựa chọn tất cả phần tử có class là btn btn-success
  let vBtnArrayElements = document.querySelectorAll(
    ".btn.btn-success.btn-choose"
  );
  // Duyệt mảng các phần tử nút được chọn sau đó thêm sự kiện click vào mỗi phần tử
  // gán classname cho mỗi phần tử sau khi được click sẽ đổi sang màu vàng
  // khi đổi sang màu vàng thì cùng lúc đó tiến hành ghi dữ liệu vào đối tượng gMenuDataObject thông qua hàm getDataMenuPizza(paramDataMenu)
  // khi ấn sang nút khác thì đổi màu xanh trở lại
  vBtnArrayElements.forEach((vBtnElement) => {
    vBtnElement.addEventListener("click", (bIn) => {
      // chuyển màu cho nút
      bIn.target.className = "btn btn-warning btn-choose";
      // sau khi đổi màu nút, ta sẽ có vài nút có class là btn-warning, để duyệt mảng các nút đó ta sử dụng []
      [].forEach.call(
        document.querySelectorAll(".btn-warning.btn-choose"),
        (cIn) => {
          if (cIn == bIn.target) {
            console.log(cIn);
            getDataMenuPizza(cIn);
          }
          if (cIn !== bIn.target) {
            // khi ấn nút khác thì đổi màu phần tử button về như cũ
            cIn.className = "btn btn-success btn-choose";
          }
        }
      );
    });
  });
}

// khai báo hàm truy xuất dữ liệu phần menu pizza
function getDataMenuPizza(paramDataMenu) {
  //truy suat vao node cha cua phan tu nut
  let vDivCardBodyMenu =
    paramDataMenu.parentNode.previousSibling.previousSibling;
  //Card header div, dung de truy xuat vao innerHtml cua childnode h3
  let vH3SizeMenu =
    vDivCardBodyMenu.previousSibling.previousSibling.querySelector("h3");
  // truy xuất phần tử ul từ button được click
  let vUlInfoMenu = vDivCardBodyMenu.querySelector("ul");
  // truy xuất mảng các phần tử li từ button được click, data của childNodes li sẽ chứa dữ liệu ta cần
  let vLiArrayInfoMenu = vUlInfoMenu.querySelectorAll("li");

  //gán dữ liệu, thông tin của kích cỡ pizza vào object gMenuDataObject
  gMenuDataObject.dimesion = vLiArrayInfoMenu[0].childNodes[1].data.trim();
  gMenuDataObject.suongNuong = vLiArrayInfoMenu[1].childNodes[1].data.trim();
  gMenuDataObject.saLad = vLiArrayInfoMenu[2].childNodes[1].data.trim();
  gMenuDataObject.nuocNgot = vLiArrayInfoMenu[3].childNodes[1].data.trim();
  gMenuDataObject.gia = vLiArrayInfoMenu[4].querySelector("b").innerHTML;
  gMenuDataObject.size = vH3SizeMenu.innerHTML;
  console.log(gMenuDataObject);
}

// Khai báo hàm thực thi chuyển màu khi ấn nút chọn phần "CHỌN LOẠI PIZZA"
function onClickChangeColorPizza() {
  // lựa chọn tất cả phần tử có class là btn btn-info btn-type-pizza
  let vBtnArrayElements = document.querySelectorAll(
    ".btn.btn-info.btn-type-pizza.w-100"
  );
  // Duyệt mảng các phần tử nút được chọn sau đó thêm sự kiện click vào mỗi phần tử
  // gán classname cho mỗi phần tử sau khi được click sẽ đổi sang màu vàng
  // khi đổi sang màu vàng thì cùng lúc đó tiến hành thực thi hàm onClickGetDataPizza(), để ghi dữ liệu
  // khi ấn sang nút khác thì đổi màu xanh trở lại
  vBtnArrayElements.forEach((vBtnElement) => {
    vBtnElement.addEventListener("click", (bIn) => {
      // chuyển màu cho nút
      bIn.target.className = "btn btn-warning btn-type-pizza w-100";
      // sau khi đổi màu nút, ta sẽ có vài nút có class là btn-warning, để duyệt mảng các nút đó ta sử dụng []
      [].forEach.call(
        document.querySelectorAll(".btn.btn-warning.btn-type-pizza.w-100"),
        (cIn) => {
          if (cIn == bIn.target) {
            onClickGetDataPizza(cIn);
          }
          if (cIn !== bIn.target) {
            // khi ấn nút khác thì đổi màu phần tử button về như cũ
            cIn.className = "btn btn-info btn-type-pizza w-100";
          }
        }
      );
    });
  });
}
// khai bao function in ra console khi chọn loại pizza
// trả về một mảng chứa object dữ liệu loại pizza
function onClickGetDataPizza(paramPizza) {
  // khai báo đối tượng pizza
  let vDataPizza = {
    name: "",
    price: "",
  };
  //truy xuất vào node cha của phần tử nút chọn được nhấn
  let vDivParrentNodePizzaElement = paramPizza.parentNode.parentNode;
  //truy xuất vào node h3 chứa tên pizza
  let vNamePizzaElement =
    vDivParrentNodePizzaElement.querySelector(".h3-pizza-name");
  //truy xuất vào node btn chứa giá pizza
  let vPricePizzaElement =
    vDivParrentNodePizzaElement.querySelector(".btn-pizza-price");
  // bind tên và giá của pizza vào đối tượng vDataPizza
  vDataPizza.name = vNamePizzaElement.innerHTML.trim();
  vDataPizza.price = vPricePizzaElement.innerHTML.trim();
  // push object vDataPizza vào mảng global gSelectedPizzaType;
  gSelectedPizzaType.push(vDataPizza);
  // kiểm tra biến global có dữ liệu chưa
  // console.log(gSelectedPizzaType);
  // trả về đối tượng gSelectedPizzaType sau khi đã lưu dữ liệu vào nó
  return gSelectedPizzaType;
}

// khai báo hàm xử lý gửi đơn hàng
function onSubmitOrderPizza(paramOrder) {
  // khai báo các biến local, chứa giá trị của form input
  let vInputNameOrder = document.getElementById("inputName");
  let vInputEmailOrder = document.getElementById("inputEmail");
  let vInputPhoneOrder = document.getElementById("inputPhone");
  let vInputAddressOrder = document.getElementById("inputAddress");
  let vInputMsgOrder = document.getElementById("inputMessage");
  let vInputCouponOrder = document.getElementById("inputCoupon");

  // Thuc thi ham này khi bấm gửi đơn
  gFormDataSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    // khai bao mot object chua du lieu form
    let vFormDataOject = {
      fullName: vInputNameOrder.value.trim(),
      email: vInputEmailOrder.value.trim(),
      phone: parseInt(vInputPhoneOrder.value.trim()),
      message: vInputMsgOrder.value.trim(),
      address: vInputAddressOrder.value.trim(),
      coupon: vInputCouponOrder.value.trim(),
    };
    // kiểm tra object form xem đã lưu được dữ liệu chưa
    console.log(vFormDataOject);

    // lấy lựa chọn loại pizza cuối cùng, vì khách hàng có thể đổi ý nhiều lần
    let vArrayPizzaType = paramOrder;
    let vLastItemOfArrayPizzaType = vArrayPizzaType.at(-1);
    // Kiểm tra mảng đã có dữ liệu hay chưa
    // console.log(paramOrder);

    // xử lý validate giá trị của form ở đây
    let isValidData = isValidFormData(
      vFormDataOject,
      gMenuDataObject,
      vArrayPizzaType,
      gDiscountVouchers,
      vInputCouponOrder
    );

    // khai báo hàm kiểm soát việc giảm giá
    // khi form nhập vào đúng, thì mới trả về một biến discount có giảm giá
    function discountHandlePrice() {
      // khai báo biến
      let vIsDiscount = 0;
      if (isValidData && vInputCouponOrder.value == "") {
        vIsDiscount = 0;
      } else if (isValidData) {
        vIsDiscount = 20;
      }
      return vIsDiscount;
    }
    // lưu giá trị trả về của hàm trên vào một biến, truyền vào hàm showData
    let vDiscountChecked = discountHandlePrice();

    // check valid form, nếu valid thì showdata
    if (isValidData) {
      // sau khi xử lý thì showdata ra ở đây
      showDataOrder(
        vLastItemOfArrayPizzaType,
        vFormDataOject,
        gMenuDataObject,
        vDiscountChecked
      );
    }
  });

  // khai báo hàm xử lý validate form
  // validate tất cả các trường nhập vào ngoại trừ trường message và mã giảm giá, có thể k nhập cũng được
  function isValidFormData(
    paramForm,
    paramMenu,
    paramPizzaType,
    paramCoupons,
    paramInputCoupon
  ) {
    // Check nếu khách hàng chưa chọn cỡ pizza
    if (paramMenu.dimesion == null) {
      alert("Chưa chọn cỡ pizza");
      return false;
    }

    // Check nếu khách hàng chưa chọn loại pizza
    if (paramPizzaType.length == 0) {
      alert("Chưa chọn loại pizza");
      return false;
    }

    // Check nếu khách hàng chưa nhập tên
    if (paramForm.fullName == "") {
      alert("Chưa nhập tên");
      return false;
    }

    // Check nếu khách hàng chưa nhập email
    if (paramForm.email == "") {
      alert("Chưa nhập Email");
      return false;
    }

    console.log(paramForm.phone);
    // Check nếu khách hàng chưa nhập phone
    if (isNaN(paramForm.phone)) {
      alert("Chưa nhập số điện thoại");
      return false;
    }

    // Check nếu khách hàng chưa nhập địa chỉ
    if (paramForm.address == "") {
      alert("Chưa nhập địa chỉ");
      return false;
    }

    // Check nếu khách hàng chưa nhập message
    if (paramForm.message == "") {
      console.log("Chưa nhập lời nhắc");
    }

    // khai báo một biến chuyển trạng thái khi khách hàng nhập đúng mã giảm giá
    let isValidCoupon = false;

    // duyệt mảng các mã giảm giá hợp lệ
    paramCoupons.map((paramCoupon) => {
      // Check nếu khách hàng chưa nhập coupon
      console.log(paramCoupon);

      switch (paramForm.coupon) {
        case "":
          console.log("Không có mã giảm giá");
          isValidCoupon = true;
          break;
        case paramCoupon:
          console.log("mã hợp lệ");
          isValidCoupon = true;
          break;
      }
    });

    // khi nhập đúng mã giảm giá thì trả về true cho hàm isValidFormData();
    // khi nhập không đúng thì reset ô nhập coupon và trả về false
    if (isValidCoupon === true) {
      return true;
    } else {
      alert("Mã giảm giá không hợp lệ");
      paramInputCoupon.value = "";
      return false;
    }
  }

  // Khai bao ham show data, có template để render ra dữ liệu trên frontend khi đã valid data
  function showDataOrder(paramPizza, paramForm, paramMenu, paramDiscount) {
    // Check paramPizza tham số truyền vào có rỗng hay không (khách hàng có thể chưa chọn món)
    // nếu khách hàng chưa chọn món thì catch error và alert
    try {
      if (paramPizza !== null) {
        let vDivInfoOrder = document.getElementById("div-info-order");
        let vTemplateShow = `
        <div class="div-user-info">
          <p>Họ và tên: ${paramForm.fullName}</p>
          <p>Email: ${paramForm.email}</p>
          <p>Điện thoại: ${paramForm.phone}</p>
          <p>Địa chỉ: ${paramForm.address}</p>
          <p>Lời nhắn: ${paramForm.message}</p>
        </div>
        <hr />
        <div class="div-pizza-size">
          <p>Kích cỡ: ${paramMenu.size}</p>
          <p>Đường kính: ${paramMenu.dimesion}</p>
          <p>Sườn nướng: ${paramMenu.suongNuong}</p>
          <p>Salad: ${paramMenu.saLad}</p>
          <p>Nước ngọt: ${paramMenu.nuocNgot}</p>
        </div>
        <hr />
        <div class="div-pizza-type">
          <p>Loại pizza: ${paramPizza.name}</p>
          <p>Mã voucher: ${paramForm.coupon}</p>
          <p>Giá VND: ${paramPizza.price}</p>
          <p>Discount: ${paramDiscount}% </p>
          <strong>Số tiền phải trả: ${
            paramPizza.price * ((100 - paramDiscount) / 100)
          } VND</strong>
        </div>
        <button id="btn-confirm" class="my-3 w-100 btn btn-warning">
          Xác nhận đơn hàng
        </button>
      `;
        vDivInfoOrder.classList.replace("d-none", "d-block");
        vDivInfoOrder.innerHTML = vTemplateShow;
        // Khai báo hàm xác nhận đơn hàng
        function onClickConfirmOrder() {
          //truy xuất phần tử nút xác nhận
          let vBtnConfirm = document.querySelector("#btn-confirm");
          // thêm sự kiện click vào nút xác nhận
          vBtnConfirm.addEventListener("click", () => {
            // khi bấm nút xác nhận xong sẽ alert bạn đã đặt thành công
            alert("BẠN ĐÃ ĐẶT HÀNG THÀNH CÔNG");
            // xóa thông tin đơn hàng sau khi đặt thành công, chuẩn bị cho lần đặt sau
            vDivInfoOrder.classList.replace("d-block", "d-none");
            //reset lại các trường nhập liệu cho các lần đặt hàng tiếp theo
            vInputNameOrder.value = "";
            vInputEmailOrder.value = "";
            vInputPhoneOrder.value = "";
            vInputAddressOrder.value = "";
            vInputMsgOrder.value = "";
            vInputCouponOrder.value = "";
            // reset lại màu các nút chọn menu
            let vBtnArrayMenuElements = document.querySelectorAll(
              ".btn.btn-warning.btn-choose"
            );
            vBtnArrayMenuElements.forEach((vBtnElement) => {
              vBtnElement.className = "btn btn-success btn-choose";
            });
            // reset lại màu các nút chọn loại pizza
            let vBtnArrayTypeElements = document.querySelectorAll(
              ".btn.btn-warning.btn-type-pizza.w-100"
            );
            vBtnArrayTypeElements.forEach((vBtnElement) => {
              vBtnElement.className = "btn btn-info btn-type-pizza w-100";
            });
          });
        }
        // chạy hàm xác nhận đơn hàng sau khi ấn nút xác nhận
        onClickConfirmOrder();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
