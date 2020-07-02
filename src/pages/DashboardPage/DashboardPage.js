import React, { Component } from 'react'
import SiteHeader from '../../components/SiteHeader'
import Aside from '../../components/Aside'
import TimeLine from '../../containers/TimeLine'
import styles from './DashboardPage.module.css'
import { connect } from 'react-redux'
import { fetchDashboard } from '../../actions/dashboard'

class DashboardPage extends Component {
  componentDidMount() {
    this.props.fetchDashboard()
  }

  render() {
    return (
      <div>
        <SiteHeader {...this.props} />
        <div className={styles.contentWrapper} >
          <Aside user={this.props.user} />
          <TimeLine />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  fetchDashboard
}

const mapStateToProps = (state) => ({user: state.user.user})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)
