<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Note;

class NoteController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $user = User::find(Auth::id());
        return $user->notes;
    }

    public function create(Request $request)
    {
        $user = User::find(Auth::id());
        $note = new Note;
        $note->body = $request->body;
        $note->todo_id = $request->todo_id;
        $note->save();

        return $user->notes->last();
    }

    public function setBody(Request $request)
    {
        $user = User::find(Auth::id());
        $note = Note::find($request->id);
        $note->body = $request->body;
        $note->save();
        return $user->notes;
    }

    public function delete(Request $request)
    {
        $user = User::find(Auth::id());
        $note = Note::find($request->id);
        // $note->body = $request->body;
        $note->delete();
        return $user->notes;
    }
}