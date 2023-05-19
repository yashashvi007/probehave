import ModuleCards from "@/components/ModuleCards/ModuleCards";
import Layout from "@/components/Layout/Layout";

const modules = [
  {
    moduleTitle: "Module1",
    description: "Other details of product",
    rating: 5,
  },
  {
    moduleTitle: "Module1",
    description: "Other details of product",
    rating: 5,
  },
  {
    moduleTitle: "Module1",
    description: "Other details of product",
    rating: 5,
  },
  {
    moduleTitle: "Module1",
    description: "Other details of product",
    rating: 5,
  },
  {
    moduleTitle: "Module1",
    description: "Other details of product",
    rating: 5,
  },
];

function Module() {
  return (
    <>
      <Layout>
        <div className="modulePage">
          <div className="module-main">
            <div className="module-heading-paragraph">
              <h1>Modules</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                fermentum libero non varius suscipit. Duis vehicula ante in
                sapien vehicula, eget efficitur neque varius. Sed lobortis
                libero ipsum, vel porttitor risus pretium ut
              </p>
            </div>
            <div className="module-img-container">
              <img
                src="./Images/ModulePage/CardImg.svg"
                alt=""
                height={250}
                width={250}
              />
            </div>
          </div>
          <div className="module-recommedation">
            <div className="">
              <h2 style={{ marginLeft: "50px" }}>Popular of the month</h2>
              <ModuleCards
                title="Popular of the month"
                modules={modules}
                hideCard=""
              />
            </div>
            <div className="module-blue-gradient"></div>
            <div className="">
              <h2 style={{ marginLeft: "50px" }}>All time favorite</h2>
              <ModuleCards
                title="All time favorite"
                modules={modules}
                hideCard=""
              />
            </div>
            <div className="module-purple-gradient"></div>
            <div className="">
              <h2 style={{ marginLeft: "50px" }}>Most rated modules</h2>
              <ModuleCards
                title="Most rated modules"
                modules={modules}
                hideCard=""
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Module;
