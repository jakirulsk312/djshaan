import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ReportIssue = () => {
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
            ⚠️ Report Issue
          </h2>
          <p>
            If you encounter any problems with our site or downloads, please report them here. We will resolve issues promptly to ensure a smooth experience.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ReportIssue;
