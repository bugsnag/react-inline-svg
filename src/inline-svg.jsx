class InlineSVG extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loading: true};
  }

  componentWillMount() {
    SVGCache.instance.subscribe(this, this.props.src, function(component) {
      component.setState({loading: false});
    });
  }

  render() {
    if(this.state.loading) {
      <span/>
    } else {
      return React.DOM.span({
        className: this.props.className,
        dangerouslySetInnerHTML: {
          __html: SVGCache.instance.getItem(this.props.src).content
        }
      });
    }
  }
}

InlineSVG.displayName = "InlineSVG";
