console.log( "===== simpread option labs load =====" )

import {browser} from 'browser';
import * as menu from 'menu';

import Switch    from 'switch';
import TextField from 'textfield';
import Button    from 'button';

import Auth      from 'authorize';

export default class LabsOpt extends React.Component {

    static defaultProps = {
        option : {},
        read   : {},
        focus  : {},
    }

    static propTypes = {
        option : React.PropTypes.object,
        read   : React.PropTypes.object,
        focus  : React.PropTypes.object,
        onChange : React.PropTypes.func,
    }

    onChange( value, model, state, child ) {
        !child && ( this.props[model][state]=value );
        child  && ( this.props[model][state][child]=value );
        child  && menu.Refresh( this.props[model][state] );
        this.props.onChange && this.props.onChange( true );
        model == "read" && state == "auto" && this.exclusionState( value );
        model == "read" && state == "toc"  && this.tocState( value );
    }

    changeExclusion() {
        this.props.read.exclusion = event.target.value.split("\n");
        this.props.onChange && this.props.onChange( false );
    }

    changeWhitelist() {
        this.props.read.whitelist = event.target.value.split("\n");
        this.props.onChange && this.props.onChange( false );
    }

    tocState( value ) {
        $( this.refs.toc ).velocity( value ? "slideDown" : "slideUp" );
    }

    exclusionState( value ) {
        $( this.refs.exclusion  ).velocity( value ? "slideDown" : "slideUp" );
        $( this.refs.whitelist ).velocity( !value ? "slideDown" : "slideUp" );
    }

    componentDidMount() {
        this.exclusionState( this.props.read.auto );
        this.tocState( this.props.read.toc );
    }

    onClick( state ) {
        state == "custom" && ( location.href = location.origin + "/options/custom.html" );
    }

    changeOrigins() {
        this.props.option.origins = event.target.value.split("\n");
        this.props.onChange && this.props.onChange( false );
    }

    origins( type ) {
        console.log( "sadfasfasf", type )
    }

    render() {
        return (
            <div id="labs" style={{ width: '100%' }}>
                <div className="label">全局</div>
                <div className="lab">
                    <Switch width="100%" checked={ this.props.option.esc }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否启用 「ESC」 退出方式？"
                            desc="包括：聚焦模式与阅读模式"
                            onChange={ (s)=>this.onChange(s, "option", "esc") } />
                    <Switch width="100%" checked={ this.props.option.br_exit }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="动作栏图标是否改为 「进入/退出 」模式？"
                            desc="包括：聚焦模式和阅读模式，默认（关闭）为「弹出设定对话框」"
                            onChange={ (s)=>this.onChange(s, "option", "br_exit") } />
                    <Switch width="100%" checked={ this.props.option.secret }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="同步时是否包含授权服务中的授权码？"
                            desc="包括：导出配置文件到本地，默认（关闭）为不同步；启用后，请妥善保管你的授权码"
                            onChange={ (s)=>this.onChange(s, "option", "secret") } />
                </div>

                <div className="label">右键菜单</div>
                <div style={{ 'padding-top': '10px' }} className="lab">
                    <Switch width="100%" checked={ this.props.option.menu.focus }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否显示「聚焦模式」？"
                            onChange={ (s)=>this.onChange(s, "option", "menu", "focus" ) } />
                    <Switch width="100%" checked={ this.props.option.menu.read }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否显示「阅读模式」？"
                            onChange={ (s)=>this.onChange(s, "option", "menu", "read" ) } />
                    <Switch width="100%" checked={ this.props.option.menu.link }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否显示「使用阅读模式打开此链接」？"
                            onChange={ (s)=>this.onChange(s, "option", "menu", "link" ) } />
                    <Switch width="100%" checked={ this.props.option.menu.list }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否显示「打开稍后读」？"
                            onChange={ (s)=>this.onChange(s, "option", "menu", "list" ) } />
                </div>

                <div className="label">聚焦模式</div>
                <div style={{ 'padding-top': '10px' }} className="lab">
                    <Switch width="100%" checked={ this.props.focus.mask }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否启用点击空白（遮罩）退出功能？"
                            onChange={ (s)=>this.onChange(s, "focus", "mask") } />
                    <Switch width="100%" checked={ this.props.focus.controlbar }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否一直显示右下角的控制栏？"
                            desc="关闭意味着「鼠标移上时才显示」"
                            onChange={ (s)=>this.onChange(s, "focus", "controlbar") } />
                    <Switch width="100%" checked={ this.props.focus.highlight }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否启用手动聚焦模式？"
                            desc="关闭意味着使用「自动聚焦模式」"
                            onChange={ (s)=>this.onChange(s, "focus", "highlight") } />
                </div>

                <div className="label">阅读模式</div>
                <div style={{ 'padding-top': '10px' }} className="lab">
                    <Switch width="100%" checked={ this.props.read.progress }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否显示阅读进度？"
                            onChange={ (s)=>this.onChange(s, "read", "progress") } />
                    <Switch width="100%" checked={ this.props.read.controlbar }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否一直显示右下角的控制栏？"
                            desc="关闭意味着「鼠标移上时才显示」"
                            onChange={ (s)=>this.onChange(s, "read", "controlbar") } />
                    <Switch width="100%" checked={ this.props.read.highlight }
                            thumbedColor="#3F51B5" trackedColor="#7986CB"
                            label="是否启动临时阅读模式？"
                            desc="当页面未适配阅读模式时，才能使用此功能"
                            onChange={ (s)=>this.onChange(s, "read", "highlight") } />
                    <Switch width="100%" checked={ this.props.read.toc }
                            thumbedColor="#3F51B5" trackedColor="#7986CB"
                            label="是否自动生成大纲（目录）？"
                            desc="只整理 h1, h2, h3, h4 的内容为大纲"
                            onChange={ (s)=>this.onChange(s, "read", "toc") } />
                    <div ref="toc">
                        <Switch width="100%" checked={ this.props.read.toc_hide }
                                thumbedColor="#3F51B5" trackedColor="#7986CB"
                                label="大纲（目录）是否开启「鼠标移动到右上角」自动显示？"
                                desc="关闭意味着「一直显示」"
                                onChange={ (s)=>this.onChange(s, "read", "toc_hide") } />
                    </div>
                    <Switch width="100%" checked={ this.props.read.auto }
                            thumbedColor="#3F51B5" trackedColor="#7986CB"
                            desc="白名单与黑名单功能互斥，当启用「自动进入阅读模式」，白名单即失效。"
                            label="如果当前页面适配阅读模式，是否自动进入阅读模式？"
                            onChange={ (s)=>this.onChange(s, "read", "auto") } />

                    <div ref="exclusion" style={{ 'padding-top': '10px', 'margin-bottom': '8px;' }}>
                        <div className="label">排除列表（黑名单）</div>
                        <TextField 
                            multi={ true } rows={8}
                            placeholder="每行一个，支持： URL, minimatch 等。" 
                            value={ ( this.props.read.exclusion||[] ).join( "\n" ) }
                            onChange={ ()=>this.changeExclusion() }
                        />
                    </div>

                    <div ref="whitelist" style={{ 'padding-top': '10px', 'margin-bottom': '8px;' }}>
                        <div className="label">白名单</div>
                        <TextField 
                            multi={ true } rows={8}
                            placeholder="每行一个，支持： URL, minimatch 等。" 
                            value={ ( this.props.read.whitelist||[] ).join( "\n" ) }
                            onChange={ ()=>this.changeWhitelist() }
                        />
                    </div>
                </div>

                <div className="label">授权管理</div>
                <div style={{ 'padding-top': '10px' }} className="lab">
                    <Auth/>
                </div>

                <div className="label">自定义样式</div>
                <div style={{ 'padding-top': '10px', 'position': 'relative' }} className="lab" onClick={ ()=>this.onClick('custom') }>
                    <div className="more">
                        <div>增强「中文阅读体验」设置</div>
                        <span className="desc">包括：标题、描述、正文的字间距、行间距、首行缩进等及自定义 CSS。</span>
                        <span className="arrow"></span>
                    </div>
                </div>

                <div className="label">站点适配器</div>
                <div ref="origins" style={{ 'padding-top': '10px', 'margin-bottom': '8px;' }} className="lab">
                    <div className="label">站点适配源</div>
                    <TextField 
                        multi={ true } rows={8}
                        placeholder="仅支持 URL 地址，每行一个。" 
                        value={ ( this.props.option.origins||[] ).join( "\n" ) }
                        onChange={ ()=>this.changeOrigins() }
                    />
                    <div style={{ "display": "flex" }}>
                        <Button type="raised" text="加载官方适配列表"
                            width="100%" style={{ "margin": "0" }}
                            color="#fff" backgroundColor="#4CAF50"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.origins( "download" ) } />
                        <Button type="raised" text="导入适配列表"
                            width="100%" style={{ "margin": "0 10px" }}
                            color="#fff" backgroundColor="#3F51B5"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.origins( "import" ) } />
                        <Button type="raised" text="清除适配列表" 
                            width="100%" style={{ "margin": "0" }}
                            color="#fff" backgroundColor="#FF5252"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.origins( "clear" ) } />
                    </div>
                    <div style={{ 'padding-top': '10px', 'position': 'relative' }} onClick={ ()=>this.onClick('siteeditor') }>
                        <div className="more">
                            <div>适配站点编辑器</div>
                            <span className="desc">可以编辑全部的自定义适配站点。</span>
                            <span className="arrow" style={{ 'bottom': '13px' }}></span>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}