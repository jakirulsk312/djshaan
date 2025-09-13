import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService: React.FC = () => {
  return (
    <>
      <Header />
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

        {/* Terms & Conditions */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "1rem",
              color: "#FFD700",
              borderBottom: "2px solid #FFD700",
              paddingBottom: "0.5rem",
            }}
          >
            📌 Terms & Conditions
          </h2>
          <p>
            Welcome to <strong>VDJ Shaan</strong> (www.vdjshaan.com). By using
            this website and purchasing our digital albums, you agree to
            comply with and be bound by the following terms and conditions:
          </p>
          <ul style={{ marginLeft: "1.5rem", marginTop: "1rem", listStyleType: "disc" }}>
            <li>All music products (albums, mixes, and digital downloads) are for personal use only.</li>
            <li>Resale, redistribution, or unauthorized sharing of downloads is strictly prohibited.</li>
            <li>Prices are subject to change without prior notice.</li>
            <li>We reserve the right to update or modify these Terms at any time.</li>
          </ul>
          <p style={{ marginTop: "1rem" }}>
            For questions, please contact us at{" "}
            <a
              href="mailto:vdjshaanofficial@gmail.com"
              style={{ color: "#1E90FF", textDecoration: "underline" }}
            >
              vdjshaanofficial@gmail.com
            </a>{" "}
            or call <strong>+91 8777014993</strong>.
          </p>
        </section>

        <hr style={{ margin: "3rem 0", borderColor: "#555" }} />

        {/* Refund Policy */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "1rem",
              color: "#FFD700",
              borderBottom: "2px solid #FFD700",
              paddingBottom: "0.5rem",
            }}
          >
            📌 Refund Policy
          </h2>
          <ul style={{ marginLeft: "1.5rem", marginTop: "1rem", listStyleType: "disc" }}>
            <li>All sales of digital music (albums, mixes, downloads) are final.</li>
            <li>Since these are digital products, we do not offer refunds, cancellations, or exchanges once a download link has been issued.</li>
            <li>If you face any technical issue with downloading, please contact us within 24 hours, and we will assist you.</li>
          </ul>
        </section>

        <hr style={{ margin: "3rem 0", borderColor: "#555" }} />

        {/* Privacy Policy */}
        <section style={{ marginBottom: "3rem" }}>
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
          <ul style={{ marginLeft: "1.5rem", marginTop: "1rem", listStyleType: "disc" }}>
            <li>We respect your privacy and are committed to protecting your personal data.</li>
            <li>Information such as your name, email, and payment details will only be used to process your order and improve user experience.</li>
            <li>We do not sell, rent, or share your personal information with third parties, except as required by law or for secure payment processing.</li>
            <li>By using our site, you consent to our privacy practices.</li>
          </ul>
        </section>

        <hr style={{ margin: "3rem 0", borderColor: "#555" }} />

        {/* About Us */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "1rem",
              color: "#FFD700",
              borderBottom: "2px solid #FFD700",
              paddingBottom: "0.5rem",
            }}
          >
            📌 About Us
          </h2>
          <p>
            <strong>VDJ Shaan</strong> is India’s No.1 VDJ, known for creating a
            unique fusion of Indian and Arabic sounds for global dance floors.
            This platform offers exclusive albums, original edits, and music
            projects from the Mirage series.
          </p>
          <p>
            Our mission is to share the Mirage culture worldwide and make
            music easily accessible to fans through secure, simple downloads.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;
