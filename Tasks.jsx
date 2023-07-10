
// eslint-disable-next-line react/prop-types, no-unused-vars
const Tasks = ({ title, description, date, image }) => {
  return (
    <>
      <div className="card rounded-5 shadow-sm mt-4">
        <div className="card body rounded-4">
          <div className="row mt-2 ms-2">
            <div className="clearfix">
              <div className="float-start">
                <s className="card-title tasktitle">{title}</s>
                <p className="lead tasklead">{description}</p>
              </div>
              <div className="float-end pe-4 pt-3">
                <div className="cntr">
                  <input
                    checked=""
                    type="checkbox"
                    id="cbx"
                    className="hidden-xs-up"
                  />
                  <label htmlFor="cbx" className="cbx"></label>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-9 ps-5">
              <p className="lead taskdate">{date}</p>
            </div>
            <div className="col-sm-3">
              <img
                src={image}
                className="float-end me-4 pb-2"
                width='50%'
                height="40px"
                alt="people"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Tasks;
