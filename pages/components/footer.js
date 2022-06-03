export default function Footer(){
    return (
        <footer className="bg-dark" style={stylesheet}>
            <div id="footer">
            <p>
                <span>João Pedro Silva Souza</span>
            </p>
            </div>
        </footer>
    )
}

const stylesheet = {
    color: "white",
    padding: "30px",
    textAlign: "center",
    width: "100%",
    bottom: "0",
    marginTop: "auto"
}
