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
        $note->body = $request->note['body'];
        $note->todo_id = $request->note['todo_id'];
        $note->save();
        return $user->notes;
    }

    public function setBody(Request $request)
    {
        $user = User::find(Auth::id());
        $note = Note::find($request->noteData['id']);
        $note->body = $request->noteData['body'];
        $note->save();
        return $user->notes;
    }

    public function delete(Request $request)
    {
        $user = User::find(Auth::id());
        $note = Note::find($request->noteData['id']);
        $note->delete();
        return $user->notes;
    }
}