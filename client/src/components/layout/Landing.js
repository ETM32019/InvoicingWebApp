import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Fragment>
      <header className="masthead">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 text-center">
              <h1 className="font-weight-light">Simple Invoicing Web App</h1>
              <p className="lead">manage your invoices and estimates</p>
              <Link className="btn btn-info mx-2" to='/login'>Login</Link>
              <Link className="btn btn-light mx-2" to='/register'>Register</Link>
            </div>
          </div>
        </div>
      </header>
      <section className="py-5">
        <div className="container">
          <h2 className="font-weight-light">Page Content</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repellendus ab nulla dolorum autem nisi officiis blanditiis
            voluptatem hic, assumenda aspernatur facere ipsam nemo ratione
            cumque magnam enim fugiat reprehenderit expedita.
          </p>
        </div>
      </section>
    </Fragment>
  );
};

export default Landing;
