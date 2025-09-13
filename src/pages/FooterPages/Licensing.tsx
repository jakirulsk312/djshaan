import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Licensing = () => {
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
                        🎵 Licensing
                    </h2>
                    <p>
                        All DJ mashups and music content are licensed for personal use. Commercial usage requires permission from the creator.
                    </p>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default Licensing;
