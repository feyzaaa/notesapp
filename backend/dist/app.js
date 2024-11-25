"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const notes_1 = __importDefault(require("./routes/notes"));
const users_1 = __importDefault(require("./routes/users"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./../swagger-output.json"));
const swagger_output_notes_json_1 = __importDefault(require("./../swagger-output-notes.json"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/person', users_1.default);
app.use('/doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
app.use('/docn', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_notes_json_1.default));
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Backend is working!');
});
app.use('/api/notes', notes_1.default);
app.use('/api/users', users_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
