import projects from "../data/projects.js"

                
const getIndex = (req, res) => res.render("index.html", { projects, errors: {}, values: {}, firstErrorField: null, formSent: false,
                formError: false, env: process.env.NODE_ENV })

export default getIndex

