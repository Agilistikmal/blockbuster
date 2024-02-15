"use client";

import { useEffect, useState } from "react";
import Login from "../components/login";

export default function Dashboard() {
  const [isLoggin, setIsLogin] = useState(false);
  const [server, setServer] = useState();
  const [staff, setStaff] = useState([]);
  const [store, setStore] = useState([]);

  async function check() {
    const res = await fetch("/api/auth", {
      headers: {
        "X-API-KEY": "1123",
      },
    });
    const data = await res.json();
    if (data.status != 200) {
      return setIsLogin(false);
    }
    return setIsLogin(true);
  }
  async function loadServer() {
    const res = await fetch("/api/server", {
      headers: {
        "X-API-KEY": "1123",
      },
    });
    const data = await res.json();
    setServer(data.data);
  }
  async function loadStaff() {
    const res = await fetch("/api/staff", {
      headers: {
        "X-API-KEY": "1123",
      },
    });
    const data = await res.json();
    setStaff(data.data);
  }
  async function loadStore() {
    const res = await fetch("/api/store", {
      headers: {
        "X-API-KEY": "1123",
      },
    });
    const data = await res.json();
    setStore(data.data);
  }
  useEffect(() => {
    check();
    loadServer();
    loadStaff();
    loadStore();
  }, []);

  const [success, setSuccess] = useState(false);
  function handleSuccess() {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  }
  return (
    <>
      {isLoggin == false ? (
        <Login />
      ) : (
        <div
          className={`w-full max-w-screen-xl mx-auto px-8 text-white my-[144px] rounded-xl ${
            success ? "bg-green-500/20" : "bg-white/10"
          } p-5`}
        >
          <h1 className="font-bold text-xl">Admin Dashboard</h1>
          {/* Admin Config */}
          <div className="border-l-4 border-red-500 p-5 mt-5">
            <h1 className="font-medium text-red-500">Admin Password</h1>
            <form
              action=""
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const jsonData = JSON.stringify(Object.fromEntries(formData));
                const res = await fetch("/api/server", {
                  method: "POST",
                  body: jsonData,
                  headers: {
                    "X-API-KEY": "1123",
                  },
                });
                const data = await res.json();
                if (data.status != 200) {
                  return alert("Current Password salah");
                }
                handleSuccess();
              }}
            >
              <div className="flex flex-wrap gap-4 items-end">
                <div>
                  <p>Current Password</p>
                  <input
                    type="password"
                    className="input"
                    name="old_password"
                  />
                </div>
                <div>
                  <p>New Password</p>
                  <input
                    type="password"
                    className="input"
                    name="new_password"
                  />
                </div>
                <div>
                  <button className="btn">Update</button>
                </div>
              </div>
            </form>
          </div>

          {/* Server Config */}
          <div className="border-l-4 border-yellow-500 p-5 mt-5">
            <h1 className="font-medium text-yellow-500">Server Config</h1>
            <form
              action=""
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const jsonData = JSON.stringify(Object.fromEntries(formData));
                const res = await fetch("/api/server", {
                  method: "POST",
                  body: jsonData,
                  headers: {
                    "X-API-KEY": "1123",
                  },
                });
                handleSuccess();
              }}
            >
              <div className="flex flex-wrap gap-4 items-end">
                <div>
                  <p>Server Name</p>
                  <input
                    type="text"
                    className="input"
                    defaultValue={server?.name}
                    name="name"
                  />
                </div>
                <div>
                  <p>Server IP</p>
                  <input
                    type="text"
                    className="input"
                    defaultValue={server?.ip}
                    name="ip"
                  />
                </div>
                <div>
                  <p>Discord Link</p>
                  <input
                    type="text"
                    className="input"
                    defaultValue={server?.discord}
                    name="discord"
                  />
                </div>
                <div>
                  <p>WhatsApp Number</p>
                  <p className="text-xs">diawali 62, tanpa tanda +</p>
                  <input
                    type="text"
                    className="input"
                    defaultValue={server?.whatsapp}
                    name="whatsapp"
                  />
                </div>
              </div>
              <div>
                <button className="btn mt-5">Save</button>
              </div>
            </form>
          </div>

          {/* Staff Data */}
          <div className="border-l-4 border-cyan-500 p-5 mt-5">
            <h1 className="font-bold text-xl">Staff List</h1>
            <div className="flex overflow-x-scroll pb-5 gap-4">
              <form
                action=""
                method="post"
                className="min-w-[320px] max-w-sm"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const jsonData = JSON.stringify(Object.fromEntries(formData));
                  const res = await fetch("/api/staff", {
                    method: "POST",
                    body: jsonData,
                    headers: {
                      "X-API-KEY": "1123",
                    },
                  });
                  loadStaff();
                  handleSuccess();
                }}
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="input"
                  />
                  <input
                    type="text"
                    name="role"
                    placeholder="Role"
                    className="input"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="btn mt-2 w-full">Add Staff</button>
                </div>
              </form>
              {staff.map((st, i) => (
                <form
                  key={i}
                  action=""
                  method="post"
                  className="min-w-[320px] max-w-sm"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const jsonData = JSON.stringify(
                      Object.fromEntries(formData)
                    );
                    const res = await fetch(
                      `/api/staff?username=${st.username}`,
                      {
                        method: "PUT",
                        body: jsonData,
                        headers: {
                          "X-API-KEY": "1123",
                        },
                      }
                    );
                    loadStore();
                    handleSuccess();
                  }}
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      defaultValue={st.username}
                      className="input"
                    />
                    <input
                      type="text"
                      name="role"
                      placeholder="Role"
                      defaultValue={st.role}
                      className="input"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="btn w-full">Save</button>
                    <button
                      type="reset"
                      className="btn !bg-red-500"
                      onClick={async () => {
                        await fetch(`/api/staff?username=${st.username}`, {
                          method: "DELETE",
                          headers: {
                            "X-API-KEY": "1123",
                          },
                        });
                        loadStaff();
                        handleSuccess();
                      }}
                    >
                      <img
                        src="/icon/trash.svg"
                        alt=""
                        className="filter invert mx-auto"
                      />
                    </button>
                  </div>
                </form>
              ))}
            </div>
          </div>

          {/* Store Data */}
          <div className="border-l-4 border-fuchsia-500 p-5 mt-5">
            <h1 className="font-bold text-xl">Store Items</h1>
            <div className="flex overflow-x-scroll pb-5 gap-4">
              <form
                action=""
                method="post"
                className="min-w-[320px] max-w-sm block"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const jsonData = JSON.stringify(Object.fromEntries(formData));
                  const res = await fetch("/api/store", {
                    method: "POST",
                    body: jsonData,
                    headers: {
                      "X-API-KEY": "1123",
                    },
                  });
                  loadStore();
                  handleSuccess();
                }}
              >
                <div className="space-y-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    className="input"
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="input"
                  />
                  <div>
                    <p className="text-xs">
                      *Perks, gunakan koma (,) untuk pemisah.
                    </p>
                    <textarea
                      name="perks"
                      rows="3"
                      className="input"
                      placeholder="Contoh: 3x Fly, 5x Home"
                    ></textarea>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="btn w-full">Add Items</button>
                </div>
              </form>
              {store.map((st, i) => (
                <form
                  key={i}
                  action=""
                  method="post"
                  className="min-w-[320px] max-w-sm"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const jsonData = JSON.stringify(
                      Object.fromEntries(formData)
                    );
                    const res = await fetch(`/api/store?id=${st.id}`, {
                      method: "PUT",
                      body: jsonData,
                      headers: {
                        "X-API-KEY": "1123",
                      },
                    });
                    loadStore();
                    handleSuccess();
                  }}
                >
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="name"
                      placeholder="name"
                      defaultValue={st.name}
                      className="input"
                    />
                    <input
                      type="text"
                      name="price"
                      placeholder="Price"
                      defaultValue={st.price}
                      className="input"
                    />
                    <div>
                      <p className="text-xs">
                        *Perks, gunakan koma (,) untuk pemisah.
                      </p>
                      <textarea
                        name="perks"
                        rows="3"
                        className="input"
                        placeholder="Contoh: 3x Fly, 5x Home"
                        defaultValue={st.perks}
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="btn w-full">Save</button>
                    <button
                      type="reset"
                      className="btn !bg-red-500"
                      onClick={async () => {
                        await fetch(`/api/store?id=${st.id}`, {
                          method: "DELETE",
                          headers: {
                            "X-API-KEY": "1123",
                          },
                        });
                        loadStore();
                        handleSuccess();
                      }}
                    >
                      <img
                        src="/icon/trash.svg"
                        alt=""
                        className="filter invert mx-auto"
                      />
                    </button>
                  </div>
                </form>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
