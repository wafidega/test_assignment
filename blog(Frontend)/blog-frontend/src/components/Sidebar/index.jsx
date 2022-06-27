import React from "react";

export default function Sidebar(props) {
  return (
    <>
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Blog Management</h3>
        </div>
        <ul className="list-unstyled components">
          <li>
            <a href="/admin/main">Dashboard</a>
          </li>
          <li>
            <a href="/admin/PostBlog">Post Blog</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
