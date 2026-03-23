import { Link } from "react-router-dom";

type TemplateCardProps = {
  to: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  state?: any;
};

export default function TemplateCard({ to, title, description, icon, state }: TemplateCardProps) {
  return (
    <Link to={to} state={state} className="card">
      <div className="icon">{icon}</div>
      <div>
        <div className="title">{title}</div>
        <div className="desc">{description}</div>
      </div>
    </Link>
  );
}