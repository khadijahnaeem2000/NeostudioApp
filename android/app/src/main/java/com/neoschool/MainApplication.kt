package com.neostudio

import android.app.Application
import android.content.Context
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.config.ReactFeatureFlags
import com.facebook.soloader.SoLoader
import java.lang.reflect.InvocationTargetException
import org.wonday.orientation.OrientationActivityLifecycle

class MainApplication : Application(), ReactApplication {

    private val mReactNativeHost: ReactNativeHost = object : ReactNativeHost(this) {
        override fun getUseDeveloperSupport(): Boolean {
            return BuildConfig.DEBUG
        }

        override fun getPackages(): List<ReactPackage> {
            val packages: List<ReactPackage> = PackageList(this).packages
            // Packages that cannot be autolinked yet can be added manually here, for example:
            // packages.add(MyReactNativePackage())
            return packages
        }

        override fun getJSMainModuleName(): String {
            return "index"
        }
    }

    private val mNewArchitectureNativeHost: ReactNativeHost? = null // Modify or replace as needed

    override val reactNativeHost: ReactNativeHost
        get() = if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED && mNewArchitectureNativeHost != null) {
            mNewArchitectureNativeHost
        } else {
            mReactNativeHost
        }

    override fun onCreate() {
        super.onCreate()
        registerActivityLifecycleCallbacks(OrientationActivityLifecycle.getInstance())
        ReactFeatureFlags.useTurboModules = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        SoLoader.init(this, /* native exopackage */ false)
        initializeFlipper(this, reactNativeHost.reactInstanceManager)
    }

    companion object {
        private fun initializeFlipper(context: Context, reactInstanceManager: ReactInstanceManager) {
            if (BuildConfig.DEBUG) {
                try {
                    val aClass = Class.forName("com.neostudio.ReactNativeFlipper")
                    aClass.getMethod("initializeFlipper", Context::class.java, ReactInstanceManager::class.java)
                        .invoke(null, context, reactInstanceManager)
                } catch (e: ClassNotFoundException) {
                    e.printStackTrace()
                } catch (e: NoSuchMethodException) {
                    e.printStackTrace()
                } catch (e: IllegalAccessException) {
                    e.printStackTrace()
                } catch (e: InvocationTargetException) {
                    e.printStackTrace()
                }
            }
        }
    }
}
