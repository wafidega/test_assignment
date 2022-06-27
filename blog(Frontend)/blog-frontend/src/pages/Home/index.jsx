import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "../../utils/axios";
// IMport Komponen
import Navbar from "../../components/Navbar";

export default function Home() {
  const [dataBlog, setDataBlog] = useState([]);
  const [order, setOrder] = useState({
    page: 1,
    limit: 10,
  });
  const [pageInfo, setPageInfo] = useState({});
  const getDataBlog = () => {
    axios
      .get(`blog/?page=${order.page}&limit=${order.limit}`)
      .then((res) => {
        console.log(res);
        setDataBlog(res.data.data);
        setPageInfo(res.data.pagination);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(() => {
    getDataBlog();
  }, []);
  console.log(dataBlog);
  return (
    <>
      <div>
        <Navbar />
        {/* Page Header*/}
        <header
          className="masthead"
          style={{
            backgroundImage:
              'url("https://p2.piqsels.com/preview/452/261/285/typewriter-vintage-desk-glasses.jpg")',
          }}
        >
          <div className="container position-relative px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-7">
                <div className="site-heading">
                  <h1>WELCOME TO MY BLOG</h1>
                  <span className="subheading">Always Give You Something</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Main Content*/}
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              {/* Post preview*/}
              {dataBlog.map((item) => (
                <>
                  <div className="post-preview">
                    <a href="post.html">
                      <h2 className="post-title">{item.title}</h2>
                      <h3 className="post-subtitle">{item.content}</h3>
                    </a>
                    <p className="post-meta">
                      Posted by
                      <a href="#!">Start Bootstrap</a>
                      on September 24, 2022
                    </p>
                  </div>
                  {/* Divider*/}
                  <hr className="my-4" />
                </>
              ))}
              <div className="d-flex justify-content-end mb-4">
                <a className="btn btn-primary text-uppercase" href="#!">
                  Older Posts →
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Footer*/}
        <footer className="border-top">
          <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-7">
                <ul className="list-inline text-center">
                  <li className="list-inline-item">
                    <a href="#!">
                      <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x" />
                        <i className="fab fa-twitter fa-stack-1x fa-inverse" />
                      </span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#!">
                      <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x" />
                        <i className="fab fa-facebook-f fa-stack-1x fa-inverse" />
                      </span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#!">
                      <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x" />
                        <i className="fab fa-github fa-stack-1x fa-inverse" />
                      </span>
                    </a>
                  </li>
                </ul>
                <div className="small text-center text-muted fst-italic">
                  Copyright © Your Website 2022
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
