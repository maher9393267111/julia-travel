import React from "react";

export default function WhatsappForm({title ='تواصل وتس اب'}) {
  return (
    <a
      href="https://wa.me/+905522344440"
      _target="blank"
      className="primary-btn1 !py-2 my-2 !font-kufi two social-list"
    >
    {title}
      <i class="bx bxl-whatsapp text-3xl"></i>
    </a>
  );
}
