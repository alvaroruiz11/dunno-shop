interface Props {
  title: string;
}

export const CustomJumbotron = ({ title }: Props) => {
  return (
    <section className="py-10 px-4 lg:px-8 bg-muted/30">
      <div className="container mx-auto text-center">
        <h1 className="font-din-next text-2xl lg:text-4xl tracking-tight mb-6">
          {title}
        </h1>
      </div>
    </section>
  );
};
