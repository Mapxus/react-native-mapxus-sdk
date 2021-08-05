package com.mapxus.map.utils

import android.content.Context
import android.content.SharedPreferences
import java.lang.reflect.InvocationTargetException
import java.lang.reflect.Method

/**
 * @author oldwang
 * @date 2018-3-2.
 */
object SharedPreferencesUtil {

    private fun getNormalSharePreferences(context: Context, fileName: String?): SharedPreferences =
        context.getSharedPreferences(fileName, Context.MODE_PRIVATE)


    private fun getSharePreferences(
        context: Context,
        fileName: String?
    ): SharedPreferences = getNormalSharePreferences(context, fileName)

    /**
     * 存值
     */
    fun put(context: Context, key: String, value: Any, fileName: String) {
        val editor = getSharePreferences(context, fileName).edit()
        with(editor) {
            when (value) {
                is String -> putString(key, value)
                is Int -> putInt(key, value)
                is Boolean -> putBoolean(key, value)
                is Float -> putFloat(key, value)
                is Long -> putLong(key, value)
                else -> throw IllegalArgumentException("Wrong type")
            }
        }
        SharedPreferencesCompat.apply(editor)
    }

    /**
     * 得到保存数据的方法，我们根据默认值得到保存的数据的具体类型，然后调用相对于的方法获取值
     */
    fun get(
        context: Context,
        key: String,
        defaultObject: Any?,
        fileName: String?
    ): Any? {
        val sp = getSharePreferences(context, fileName)
        return with(sp) {
            when (defaultObject) {
                is String -> getString(key, defaultObject as String?)
                is Int -> getInt(key, (defaultObject as Int?)!!)
                is Boolean -> getBoolean(key, (defaultObject as Boolean?)!!)
                is Float -> getFloat(key, (defaultObject as Float?)!!)
                is Long -> getLong(key, (defaultObject as Long?)!!)
                else -> throw IllegalArgumentException("Wrong type")
            }
        }
    }

    /**
     * 清除所有数据
     *
     */
    fun clear(context: Context, fileName: String) {
        val editor = getSharePreferences(context, fileName).edit()
        editor.clear()
        SharedPreferencesCompat.apply(editor)
    }
}

private object SharedPreferencesCompat {
    private val ApplyMethod = findApplyMethod()

    /**
     * 反射查找apply的方法
     */
    private fun findApplyMethod(): Method? {
        try {
            val clz: Class<*> = SharedPreferences.Editor::class.java
            return clz.getMethod("apply")
        } catch (e: NoSuchMethodException) {
        }
        return null
    }

    /**
     * 如果找到则使用apply执行，否则使用commit
     */
    fun apply(editor: SharedPreferences.Editor) {
        try {
            if (ApplyMethod != null) {
                ApplyMethod.invoke(editor)
                return
            }
        } catch (e: IllegalArgumentException) {
        } catch (e: IllegalAccessException) {
        } catch (e: InvocationTargetException) {
        }
        editor.commit()
    }
}