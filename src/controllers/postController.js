import projects from "../data/projects.js";
import createErrorsMap from "../utils/createErrorsMap.js";
import findFirstErrorField from "../utils/findFirstErrorField.js";
import { body, validationResult } from "express-validator";
import transporter from "../config/nodemailer.js";

const formValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("required")
        .isLength({ max: 254 })
        .withMessage("name is too long"),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("required")
        .isEmail()
        .withMessage("invalid email"),
    body("message").trim().notEmpty().withMessage("required"),
];

const postForm = [
    formValidation,
    async (req, res) => {
        const valid = validationResult(req);

        if (!valid.isEmpty()) {
            const errors = createErrorsMap(valid.array({ onlyFirstError: true }));
            const firstErrorField = findFirstErrorField(errors);

            res.render("index.html", {
                projects,
                errors,
                values: req.body,
                firstErrorField,
                formSent: false,
                formError: false,
                env: process.env.NODE_ENV
            });
        } else {
            const { name, email, message } = req.body;
            try {
                transporter.sendMail({
                    subject: "Enquiry from brendanlawless.co.uk contact form",
                    text: `${message} \nFrom: ${name}`,
                    to: "brendanlawless@hotmail.com",
                    replyTo: email,
                    from: process.env.EMAIL,
                });

                return res.render("index.html", {
                    projects,
                    errors: {},
                    values: {},
                    firstErrorField: null,
                    formSent: true,
                    formError: false,
                    env: process.env.NODE_ENV
                });

            } catch (e) {
                return res.render("index.html", {
                    projects,
                    errors: {},
                    values: req.body,
                    firstErrorField: null,
                    formSent: false,
                    formError: true,
                    env: process.env.NODE_ENV
                });
            }
        }
    },
];

export default postForm;
