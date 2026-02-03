export default function LogoutBtn() {
  return (
    <button
      className="btn"
      onClick={() => {
        localStorage.clear();
        window.location = "/";
      }}
    >
      Logout
    </button>
  );
}
