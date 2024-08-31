package com.neostudio

import android.content.Intent
import android.content.res.Configuration
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView
import org.devio.rn.splashscreen.SplashScreen

class MainActivity : ReactActivity() {

    /**
     * Returns the name of the main component registered from JavaScript. This is
     * used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String {
        return "neostudio"
    }

    override fun onConfigurationChanged(newConfig: Configuration) {
        super.onConfigurationChanged(newConfig)
        val intent = Intent("onConfigurationChanged")
        intent.putExtra("newConfig", newConfig)
        this.sendBroadcast(intent)
    }

    /**
     * Returns the instance of the [ReactActivityDelegate]. Here, the RootView
     * is created, and
     * you can specify the renderer you wish to use (Fabric or the older renderer).
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return MainActivityDelegate(this, mainComponentName)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        SplashScreen.show(this, true) // here
        super.onCreate(savedInstanceState)
    }

    class MainActivityDelegate(activity: ReactActivity, mainComponentName: String) : ReactActivityDelegate(activity, mainComponentName) {
        override fun createRootView(): ReactRootView {
            val reactRootView = ReactRootView(context)
            // If you opted-in for the New Architecture, we enable the Fabric Renderer.
            reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED)
            return reactRootView
        }
    }
}
