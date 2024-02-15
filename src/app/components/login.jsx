export default function Login() {
  return (
    <div className="w-full max-w-screen-sm mx-auto py-[144px] text-white">
      <h1 className="font-bold text-5xl text-center">Login</h1>
      <form
        action=""
        method="post"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const jsonData = JSON.stringify(Object.fromEntries(formData));
          const res = await fetch("/api/auth", {
            method: "POST",
            body: jsonData,
            headers: {
              "X-API-KEY": "1123",
            },
          });
          const data = await res.json();
          if (data.status != 200) {
            return alert("Username atau Password salah");
          }
          window.location.reload();
        }}
      >
        <div>
          <h1>Username</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input"
          />
        </div>
        <div>
          <h1>Password</h1>
          <input
            type="password"
            name="password"
            placeholder="P@asswwooordd"
            className="input"
          />
        </div>
        <div>
          <button className="btn mt-5 w-full">Login</button>
        </div>
      </form>
    </div>
  );
}
