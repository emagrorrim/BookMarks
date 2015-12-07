from flask import Flask, session, redirect, url_for, escape, request, jsonify, make_response, current_app
from datetime import timedelta
from functools import update_wrapper
import json



def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator

def readJson():
    with open('json_resource/bookmarks.json', 'r') as jsonFile:
        jsonArray = json.load(jsonFile)
    return jsonArray

def writeJson(jarr):
    with open('json_resource/bookmarks.json', 'w') as jsonFile:
        json.dump(jarr, jsonFile)
# jsonArray = []

def addnewbookmark(title,created,address):
    new = {"title": title, "created": created, "address": address}
    jsonArray = readJson()
    jsonArray.insert(0,new)
    writeJson(jsonArray)


def deletebookmark(index):
    jsonArray = readJson()
    jsonArray.pop(index)
    writeJson(jsonArray)


app = Flask(__name__)

@app.route('/bookmarks/all',methods=['GET'])
@crossdomain(origin='*')
def getJson():
    jsonArray = readJson();
    return jsonify({'bookmarks':jsonArray})

@app.route('/bookmarks/add',methods=['POST'])
@crossdomain(origin='*')
def addNew():
    result = 'failure'
    title = request.form.get('title','default value')
    created = request.form.get('created','default value')
    address = request.form.get('address','default value')
    if (title != 'default value') and (created != 'default value') and (address != 'default value'):
        addnewbookmark(title,created,address)
        result = 'success'
    return jsonify({'result':result})

@app.route('/bookmarks/delete',methods=['POST'])
@crossdomain(origin='*')
def deleteIndex():
    result = 'failure'
    index = request.form.get('index',-1)
    if index != -1:
        deletebookmark(int(index))
        result = 'success'
    return jsonify({'result':result})

if __name__ == "__main__":
    app.run()
