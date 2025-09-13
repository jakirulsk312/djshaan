import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const PrivacyPolicy: React.FC = () => {
  return (
    <>
    <Header/>
   <div
  style={{
    padding: "3rem 1.5rem",
    paddingTop: "calc(3rem + 80px)", // Adjust to header height
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.8",
    color: "#fff",
  }}
>

      <section>
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "1rem",
            color: "#FFD700",
            borderBottom: "2px solid #FFD700",
            paddingBottom: "0.5rem",
          }}
        >
          📌 Privacy Policy
        </h2>
        <ul
          style={{
            marginLeft: "1.5rem",
            marginTop: "1rem",
            listStyleType: "disc",
          }}
        >
          <li>We respect your privacy and are committed to protecting your personal data.</li>
          <li>Information such as your name, email, and payment details will only be used to process your order and improve user experience.</li>
          <li>We do not sell, rent, or share your personal information with third parties, except as required by law or for secure payment processing.</li>
          <li>By using our site, you consent to our privacy practices.</li>
        </ul>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default PrivacyPolicy;
