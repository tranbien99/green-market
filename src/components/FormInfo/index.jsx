import React from "react";

export default function FormInfo() {
  return (
    <form className="" style={{ width: "50%" }}>
      <div className="form-row ro">
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Họ tên</label>
          <input
            type="text"
            className="form-control"
            id="inputEmail4"
            placeholder="Họ tên"
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputPassword4">Email</label>
          <input
            type="email"
            className="form-control"
            id="inputPassword4"
            placeholder="Email"
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputPassword4">Số dt</label>
          <input
            type="phone"
            className="form-control"
            id="inputPassword4"
            placeholder="012345"
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inputAddress">Địa chỉ</label>
        <input
          type="text"
          className="form-control"
          id="inputAddress"
          placeholder="Địa chỉ"
        />
      </div>

      {/* <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputCity">City</label>
          <input type="text" className="form-control" id="inputCity" />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="inputState">State</label>
          <select id="inputState" className="form-control">
            <option selected>Choose...</option>
            <option>...</option>
          </select>
        </div>
      </div> */}
    </form>
  );
}
