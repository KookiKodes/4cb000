import React, { createElement } from "react";
import {
  CardBubble,
  DefaultBubble,
  ImageBubble,
  TextAttachmentsBubble,
} from "./index";

const capitalize = (str) =>
  str
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join("_");

const valid = ["default", "card", "image", "text attachments"];
const Bubble = ({ variant, ...props }) =>
  valid.includes(variant.toLowerCase())
    ? createElement(Bubble[capitalize(variant)], props)
    : createElement(Bubble.Default, props);
// variant
//   ? createElement(Bubble[capitalize(variant)], props)
//   : createElement(Bubble.Default, props);

Bubble.Default = (props) => <DefaultBubble {...props} />;
Bubble.Image = (props) => <ImageBubble {...props} />;
Bubble.Card = ({ attachments, ...props }) => (
  <CardBubble attachment={attachments[0]} {...props} />
);
Bubble.Text_Attachments = (props) => <TextAttachmentsBubble {...props} />;

export default Bubble;
