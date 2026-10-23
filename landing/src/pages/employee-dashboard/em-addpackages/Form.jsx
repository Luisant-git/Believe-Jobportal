import React, { useRef, useState } from "react";
import FormDetails from "./FormDetails";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, updateField } from "@/store/multiPageFormSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  faCity,
  faPlane,
  faBell,
  faTv,
  faUtensils,
  faWifi,
  faDumbbell,
  faSwimmer,
  faSpa,
  faDog,
  faBroom,
  faParking,
  faBriefcase,
  faChair,
  faLeaf,
  faBaby,
  faConciergeBell,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";

function Form() {
  return (
    <div>
      <div className="row x-gap-20 y-gap-20">
        <FormDetails />
      </div>
    </div>
  );
}

export default Form;
