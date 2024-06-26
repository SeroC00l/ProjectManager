const GradientButton = ({
    background,
    children,
  }: {
    background: string;
    children: React.ReactNode;
  }) => {
    return (
      <div
        className="p-0.5 rounded-md relative !bg-cover !bg-center transition-all"
        style={{ background }}
      >
        <div className="bg-popover/80 rounded-md p-1 text-xs text-center">
          {children}
        </div>
      </div>
    );
  };
  